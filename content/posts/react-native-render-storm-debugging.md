---
title: "Hunting a React Native Render Storm: How I Debug Performance Bugs"
seoTitle: "React Native Performance Debugging: Fix Re-Render Storms"
seoDescription: "How I debug React Native performance bugs and fix re-render storms: measure first, build a JS-thread stall monitor, and find the real cause instead of guessing."
datePublished: Mon May 18 2026 09:00:00 GMT+0000 (Coordinated Universal Time)
slug: react-native-render-storm-debugging
tags: react-native, performance, debugging, redux, javascript, mobile-development
---

I have been building React Native apps for about 8 years. After this long, performance bugs are not exciting anymore. I don't really care about making a screen "a little faster." I care about one thing only: did I find the real reason, and can I prove it?

This is a story about one of those bugs. I want to share the method I used, because the method is more useful than this one app. Some of the mistakes here are mistakes I also made early in my career, and I still see them a lot. Maybe this saves you some time.

<!-- [PERSONAL EXPERIENCE] -->

## The app and the bug

The app was a hotel booking app. iOS and Android, built in React Native. You open a home feed, you search by location and dates, you open a hotel, you see live prices from many suppliers, you compare with other sites, and you book.

The prices are not fixed. They come in over Server-Sent Events (SSE). Every supplier answers at its own speed, so a screen keeps updating for a few seconds after it opens. Remember this part. It matters later.

The report from the team was simple: "the app is slow somewhere." When I used it myself, I saw two clear problems:

- Going from **Home to Hotel** froze the JS thread at around **1 fps for about 5 seconds**.
- Scrolling the hotel screen dropped to around **5 fps**.

Small note if you are newer to this. In React Native we talk about frames per second (fps). 60 fps feels smooth. When you see frames drop to 5, even on a simple screen change, it means the JS thread is blocked. JavaScript is busy doing something heavy, so it cannot draw frames or respond to your touch. A frozen screen is almost never the network. It is almost always your own JS thread choking.

## First, don't guess

This is my main rule, and it is the one I broke the most when I was younger.

The moment people see a slow screen, they say "it is probably the images, let me lazy load them" and they start changing code. That is a guess. Guesses make new bugs and waste days. A 30 minute session that starts with measuring beats a 5 hour session that starts with a fix. Every time.

So I did not change any code yet. I went to measure.

## Don't read the code. Measure it.

The hotel screen was about 800 lines. You can read a file like that for an hour and still only have a theory about what is slow. A theory is not proof.

So instead of reading and guessing, I added small, cheap logs at every boundary. Where navigation starts, where data comes in, where components render. Then I let the running app tell me where the time goes.

I used three simple tools. The most useful one is the render counter.

First, a timeline, so I know where time zero is and how long each step takes:

```javascript
const t0 = { current: 0 };

export const markStart = (label) => {
  t0.current = Date.now();
  console.log(`[timeline] ${label} t=0`);
};

export const mark = (label) => {
  const delta = Date.now() - t0.current;
  console.log(`[timeline] ${label} +${delta}ms`);
};

// When you tap a card on Home:
markStart('nav: Home -> Hotel');
// Then at each boundary:
mark('hotel handler fired');
mark('prices query started');
mark('prices first batch committed');
```

Second, a render counter for each component, so I can see who renders too much:

```javascript
import { useRef } from 'react';

export const useRenderCount = (name) => {
  const count = useRef(0);
  count.current += 1;
  console.log(`[render] ${name} #${count.current} at +${Date.now() - t0.current}ms`);
};

// Inside a component:
useRenderCount('HotelCardsSlider');
```

A component that renders 60 times while its siblings render 6 times is your bug. You will never get that fact from reading code. You only get it from counting.

## You cannot measure a freeze from inside the freeze

This is the part many people miss. When the JS thread is blocked, your normal logs are blocked too. You cannot time a block with code that runs inside that same block.

So I built a small watchdog timer that runs outside the work. It is supposed to fire every 50ms. If it fires late, the JS thread was busy for that extra time. I log how long it was blocked and which "phase" the app was in.

```javascript
let phase = 'idle';
export const setPhase = (p) => { phase = p; };

const TICK = 50;

function startStallMonitor() {
  let expected = Date.now() + TICK;

  function tick() {
    const now = Date.now();
    const drift = now - expected;

    if (drift > 100) {
      console.log(`[STALL] JS thread blocked ${drift}ms during phase "${phase}"`);
    }

    expected = now + TICK;
    setTimeout(tick, TICK);
  }

  setTimeout(tick, TICK);
}
```

Now "it feels slow" becomes a real sentence:

```
[STALL] JS thread blocked 6895ms during phase "hotel-mount" +10042ms after navigation
```

This is no longer a feeling. Now I have a number.

## Don't trust your own labels

This is the trap that wasted the most time for me, so I want to be honest about it.

<!-- [PERSONAL EXPERIENCE] -->

My stall monitor tagged each freeze with the last timeline mark before it. That label kept pointing at an image grid (`ImageVideoGrid`), the photo and video collage at the top of the hotel screen. It looked guilty. It was the last thing logged before every freeze.

But it was not the problem. The image grid was cheap. The label was just the closest one, not the correct one.

The signal that was actually true was correlation. The render count spikes lined up in time with the freezes. When my own tool's label did not match the raw render counts, I trusted the counts and said out loud, "my stall label is wrong, ignore it." Saying your own measurement is wrong is part of the job. Many junior devs defend their first tool instead of doubting it.

## Stop guessing which child. Bisect.

The trace told me the freeze was "somewhere inside this group of 9 heavy children." I did not pick one with my gut. I added a render counter to every child and ran it again.

The result was not small:

<!-- [ORIGINAL DATA] -->

- One child, a "You might also like" hotels carousel (`HotelCardsSlider`), rendered about **60 times** per navigation, in spikes.
- Every other child rendered about **6 times**.

That carousel was **cause number one**. Here is why it was so bad. It fetched its own 20 hotels, it started its own SSE price stream for them, and then it subscribed to the **whole** `hotelPrices` Redux map. Every price update re-rendered the full image and video carousel. 60 heavy renders, and each one blocked the JS thread.

The fix was small. Instead of subscribing to the whole price map, subscribe only to the one thing it really needs: the sold out status of its own hotels, as one stable string.

```javascript
// Before: re-renders on every write to ANY hotel's price.
const prices = useAppSelector(state => state.hotelPrices);

// After: re-renders only when THIS slider's sold-out status changes.
const soldOutKey = useAppSelector(state =>
  hotelIds.map(id => (state.hotelPrices[id]?.soldOut ? '1' : '0')).join('')
);
```

## Fix one thing at a time, and prove it

I fixed only this one cause. Then I ran the exact same trace again. The carousel went from about 60 renders to about 6. The matching multi second freezes were gone. Only then did I move to the next thing.

Never say "this should fix it." Say "the same tool now shows the number moved." If you cannot show the number moved, you did not fix it. You only changed it.

The second cause was the scroll problem. The hotel screen paused the top video when you scrolled past 200px. But the scroll handler called `setState` with a fresh object on every single scroll tick:

```javascript
// Before: new object on every scroll event -> full screen re-render per tick.
onScroll={(e) => {
  const y = e.nativeEvent.contentOffset.y;
  setVideoState({ isPlay: y < 200 });
}}

// After: only set state when the threshold is actually crossed.
onScroll={(e) => {
  const y = e.nativeEvent.contentOffset.y;
  const shouldPlay = y < 200;
  setVideoState(prev =>
    prev.isPlay === shouldPlay ? prev : { isPlay: shouldPlay }
  );
}}
```

The value was the same, but a new object reference on every tick forced the whole `HotelScreen` to re-render on every pixel of scroll. That was **cause number two**, and the same trace proved the fix.

## Sometimes it is not a bug. It is the architecture.

I tried a third fix. It removed one more re-render trigger, and then the freeze came back somewhere else, and the real fix needed a big refactor.

This pattern is important. When every fix removes one trigger but the freeze just moves to a new place, and each new place needs "huge" work, you are not fixing bugs anymore. You are fighting the architecture.

The right move here is not to try fix number four. The right move is to stop, say the real structural cause in plain words, and let a human decide the scope. Patching past an architecture problem is how a one day task becomes a two week mess.

## Ship only what you proved

I shipped the two fixes that the trace really proved. I reverted the third one, because the trace showed it did not help. And I removed **100%** of the logging before merge.

Debug code is not product code. The PR had only the small, safe changes. Nothing else.

## The real problem was never one bug

This is the part I think is most useful.

<!-- [UNIQUE INSIGHT] -->

The app had three data systems on every screen: Redux Toolkit, React Query, and the SSE price streams. The problem was in how Redux was wired. Every one of the ~21 Redux slices was exposed **only** as a whole slice selector:

```javascript
// This is the default everywhere in the codebase.
const search = useAppSelector(state => state.search);
```

`useAppSelector` compares by reference. So if you read one field of a slice, you re-render when **any** field of that slice changes. Now point an SSE stream at one of those slices and put a heavy screen on top of it. That is the render storm. It was not a mistake someone made one time. It was the default behavior of the state layer.

`getSearchSelector` (the whole `search` slice) was used by 24 components. `getUserSelector` by even more. The same problem showed up on the search screen too, three navigation steps away from where it was first felt.

The bad patterns this method found, in simple words:

1. **Subscribing to too much store state.** Subscribing to a whole slice while a stream writes into it. Fix: subscribe to a small, stable derived value, not the whole slice.
2. **New values on every render or event.** A new object for the same logical value, every tick. Fix: only set state on the real change.
3. **No render isolation.** A big screen with nothing memoized, so one state change re-renders ~9 heavy subtrees. Fix: memoize sections and keep props and callbacks stable. If memoization is still new to you, I wrote a [simple guide to React hooks like `useMemo` and `useCallback`](/writing/master-the-art-of-react-hooks).
4. **Heavy mount with no virtualization.** A native map plus 50+ media items, all mounted at once on first render. Fix: delay and virtualize what is below the screen.

The first PR fixed one case. The real fix is a selector rule: scoped or derived selectors, or shallow equality, applied slice by slice. One small "easy to use" default in the state layer was showing up as JS thread freezes three screens away. That is the real story, not the two patches.

## Short version

Measure before you touch anything. Add logs at the boundaries and count renders. Add an outside stall monitor, because you cannot measure a freeze from inside it. Match freezes to render spikes, do not trust the easy label, bisect to find the child, fix one cause at a time and prove it with the same tool before the next one. When fixes keep moving the problem around, you found an architecture problem, not a bug. Stop and say so. Then remove all the debug code and ship only what you proved.

## What I keep telling myself

The hard part of performance work is not knowing `useMemo`. It is the discipline:

- Do not fix what you did not measure.
- Do not trust your first tool's label. Trust the numbers that line up.
- Do not put five "improvements" in one PR and call it faster.
- Do not keep patching when the problem keeps moving.

That discipline is the real skill. The hooks are the easy part. Holding the line on "proof first" when everyone wants a quick fix is the part that took me years to get comfortable with. I have built a lot of React Native apps over the years, including [large monorepo setups](/writing/code-sharing-react-native-monorepo), and this is still the lesson I come back to the most.

## Frequently asked questions

### Why does my React Native screen drop to 5 fps on a simple navigation?

Low fps on a simple screen change almost always means the JS thread is blocked, not the network. Something is doing heavy work on every render, usually a re-render storm where one component renders many times because it listens to state that changes all the time. Measure render counts before you blame images or animations.

### How do I find what is blocking the JS thread in React Native?

Use a stall monitor that runs outside the work: a `setTimeout` that should fire every 50ms. When it fires late, that late time is how long the JS thread was blocked. You cannot measure a freeze with code that runs inside the freeze, so the watchdog has to be the part that survives it. Pair it with a render counter per component and match the two in time.

### What causes too many re-renders with Redux and `useSelector`?

The most common cause is subscribing to too much. If you select a whole slice (`state => state.someSlice`) and compare by reference, the component re-renders when any field in that slice changes, even fields you never read. Add a stream writing into that slice many times a second and you get a render storm. Fix it by selecting a small, stable derived value, or use shallow equality.

### How do I stop a scroll handler from re-rendering the whole screen?

Do not call `setState` with a fresh object on every scroll tick. A new object for the same value still triggers a full re-render. Set state only when the value really changes, for example when you cross a scroll threshold, and use the functional updater to skip the update when nothing changed.

### When should I stop fixing performance bugs and refactor instead?

When each fix removes one trigger but the freeze comes back somewhere else, and every new fix needs "huge" work, you are not fixing bugs anymore. You are fighting the architecture. That is the signal to stop patching, say the real structural cause in plain words, and let a human decide the scope.

### What are the most common React Native performance mistakes?

Four come up again and again: subscribing to too much store state, making new objects or callbacks on every render or event, no render isolation (nothing memoized on a heavy screen), and mounting heavy things with no virtualization for off screen content.
