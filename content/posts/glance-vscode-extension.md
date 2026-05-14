---
title: "Glance — a VS Code sidebar for many Claude Code sessions at once"
seoTitle: "Glance for Claude Code: a VS Code extension to juggle multiple agents"
seoDescription: "I kept losing track of which Claude Code terminal was waiting on me. So I built Glance, a VS Code extension that puts every session on a card in the sidebar."
datePublished: Wed May 13 2026 06:30:00 GMT+0000 (Coordinated Universal Time)
slug: glance-vscode-extension
cover: /blog-images/glance-hero.png
tags: projects, vscode, claude-code, ai
---

I usually have three to five Claude Code sessions running at once. One is fixing a bug in the backend. One is babysitting a build. One is reviewing a PR. One is writing a migration. Until a few weeks ago I was tracking all of them in VS Code's terminal tabs — alt-tabbing back and forth, hunting for the one that was actually waiting on me, and missing the moment one of them finished and went idle.

So I built **Glance**.

![Glance hero — multi-session Claude Code agent panel for VS Code](/blog-images/glance-hero.png)

Glance is a VS Code extension that runs your Claude Code sessions side-by-side in a sidebar panel. Each session gets a card. The card shows what the agent is doing, how far along it is, and whether it needs you. When something is waiting on you, the activity bar lights up. When a background turn finishes, you get a toast.

It's free, MIT-licensed, and on the Marketplace as [hamzawaleed.glance-claude-code](https://marketplace.visualstudio.com/items?itemName=hamzawaleed.glance-claude-code).

## The problem I actually had

The real pain wasn't running multiple sessions — that part Claude Code handles fine. The pain was *knowing which one to look at*. Terminal tabs are silent. They don't tell you "this one finished" or "this one is asking for permission." So I'd get pulled into one session, lose context on the other four, and come back to find two of them had been idle for ten minutes.

I tried scripting around it — checking transcript files, scraping shell output, parsing emoji markers I'd had Claude print into the terminal. Everything I built was brittle. Terminals lie. Buffers wrap. ANSI escapes get in the way.

The version that actually works does something different.

## What a card shows

![Anatomy of an agent card — title, TL;DR, progress bar, status stripe, model chip, kill](/blog-images/glance-card-anatomy.png)

Every card carries five fields:

- **Title** — a 2–4 word label. The agent claims one on its first turn; you can double-click to rename it and the rename sticks.
- **TL;DR** — one short sentence describing the latest outcome. *"Refactored the auth flow."* *"Waiting on the migration to finish."*
- **Progress** — a bar with a label, for multi-step work. Hidden on trivial turns.
- **Needs input** — when set, the card lights yellow.
- **Error** — when set, the card lights red.

No log scraping. No regex over emoji. The agent itself reports its state — and that's the entire trick.

## The trick: Claude updates its own card

Glance ships a tiny MCP server that exposes one tool: `update_state`. The extension launches Claude with `--mcp-config` pointing at this server, plus a system prompt that says, in roughly these words:

> After EVERY response — short, long, trivial, planning, mid-tool-chain — your LAST action MUST be a call to `update_state`, with ALL FIVE fields populated.

Claude follows the instruction. The tool writes a small JSON payload to a per-agent state file on disk. A `chokidar` watcher in the extension picks up the file change, diffs against the last known state, and pushes a partial update to the React webview. The card re-renders.

That's the whole pipeline:

```
Claude tool call
  → MCP server writes JSON to state/<agentId>.json
  → chokidar watcher fires
  → extension diffs and posts agentUpdate to the webview
  → card re-renders
```

I tried the obvious alternative first — `--append-system-prompt` — but the shell echoed the prompt into the visible terminal on launch, which was awful. Returning the instruction in the MCP server's `initialize` response keeps it invisible.

## Three runtimes per agent

Behind every card, three things are running:

1. **The extension host.** Owns the agent list, the global hook watcher, and the on-disk persistence. Spawns each Claude session.
2. **The Claude process.** Runs in a `node-pty` child shell, wrapped in a `vscode.Pseudoterminal` so VS Code owns the scrollback. From the user's perspective, it's a normal terminal — you type, Claude responds, history scrolls.
3. **The MCP server.** A small Node script bundled with the extension, the only path Claude uses to mutate the card.

Hook events flow on a separate channel. `Stop`, `UserPromptSubmit`, `Notification`, and `SessionStart` are wired to a short Node script that drops JSON files into a watched directory. The extension reads those to know when a turn started, when it finished, when you `/clear`'d the session, when you `/compact`'d it.

The activity-bar badge — the little count that says "two of your agents need you" — is a derived count of `agents.where(needsInput || error)`. It recomputes on every update, never tracked incrementally, so it can't drift.

![Activity-bar count badge appears when an agent is waiting on you](/blog-images/glance-badge.png)

## Sessions stick around

Close VS Code. Reopen it. Every card is still there. Reload-the-window doesn't kill them either.

The trick is that cards render from the last-known state immediately (it's just a JSON file on disk), but the actual Claude process isn't restarted. When you click a dormant card to focus it, Glance shells out to `claude --resume <sessionId>` to revive that specific session. Until you click, it costs nothing.

Agents you spawned but never prompted are filtered out — they don't have a transcript on disk yet, so `claude --resume` would fail with "no conversation found." Only agents that actually got a first prompt are persisted.

## Mix models per agent

The dropdown next to **+ New Session** picks a model — Opus, Sonnet, or Haiku — for each agent. The card shows a small chip with whichever one it's running. The agent doing a quick rename can be Haiku while the one writing the migration is Opus, and you're not paying Opus prices for everything.

## Toasts you don't mind

![VS Code information toast showing an agent's name and the reason it needs you, with a Show button](/blog-images/glance-notification.png)

When a background turn finishes — meaning you're not actively looking at that agent's terminal — Glance fires a native VS Code toast. The toast carries the agent's name and the latest TL;DR or needs-input reason. A **Show** button on the toast jumps you straight to that terminal.

The toast is suppressed when you *are* already looking at the agent's terminal. No "your work is done" ping for work you're staring at.

There's a short audio tone too, configurable.

## Steering the fleet from the keyboard

The whole point of one panel is that you steer five agents from it without reaching for the mouse.

From anywhere in VS Code:

- `Cmd+Shift+G` / `Ctrl+Shift+G` — focus the Glance panel. Press it again with the panel already focused and you spawn a new agent.
- `Cmd+Alt+N` / `Ctrl+Alt+N` — new agent without leaving wherever you are.

With the panel focused:

- `↑` / `↓` — cycle through cards.
- `Enter` — jump into the highlighted agent's terminal.
- `Esc` — drop back to the panel.
- `g` — spawn a new agent.
- `c` `c` (press `c` twice within 400 ms) — run `/clear` on the highlighted agent.
- `f` — toggle the bottom panel maximized; useful for full-screening one terminal.
- `Cmd+Backspace` / `Ctrl+Backspace` — kill the highlighted agent.

Double-click a card's title to rename it. The rename is sticky — Claude won't overwrite it until you `/clear` the session. Drag a card up or down to reorder the fleet, and the order persists across reloads.

## Shipping six VSIXes per tag

The first version of Glance was a single 16 MB `.vsix` because `node-pty` bundles native prebuilds for every supported platform — darwin-arm64, darwin-x64, linux-x64, linux-arm64, win32-x64, win32-arm64. A Mac install was shipping all six, and only one was ever going to run.

A small script (`scripts/package-platforms.mjs`) moves every other-platform prebuild dir aside before `vsce package`, then puts them back in a `finally`. The Marketplace serves whichever `.vsix` matches the user's OS and arch. End result: 2.2 to 3.5 MB per install instead of 16.

The release pipeline is a GitHub Actions matrix — one job per target, all triggered by pushing a `v*` tag. macOS and Windows use the prebuilds shipped in `node-pty`'s npm tarball. Linux has no prebuilt binary, so the runner compiles `node-pty` from source via `node-gyp` and the workflow moves the build output into the `prebuilds/` slot the package script expects. Each matrix job publishes its `.vsix` independently with `fail-fast: false`, so a flaky Windows-ARM runner doesn't block the macOS release. `vsce`'s "already published" error is swallowed as success so partial re-runs are idempotent.

So: `git tag v0.0.X && git push --tags`, and ten minutes later it's live on every platform.

## What I learned building it

A few unobvious things:

- **Tool-output as a UI channel is underrated.** The MCP server returns a one-line "Agent card updated." string on every call, which is what Claude sees. Returning nothing makes Claude paranoid that the call failed and call again. Returning too much wastes tokens. One short confirmation is the sweet spot.
- **Streaming flags are tricky.** Claude's idle "Notification" hook fires after ~60s of silence — same hook that fires when it's blocked on a permission. I had to gate the "needs attention" flag on whether a stream was active, otherwise every idle agent slowly turned yellow.
- **`node-pty` won't bundle.** The native binding has to stay external in esbuild, and the spawn-helper needs `chmod +x` after `pnpm install` because npm tarballs strip the executable bit. Without that, VS Code's hardened runtime refuses to `posix_spawnp` it.
- **State-file polling beats native fs events on macOS sometimes.** Chokidar in polling mode (250ms) ended up more reliable than fsevents for the small JSON writes the MCP server does.

## Try it

If you spend any real time in Claude Code and have ever lost track of which terminal was doing what:

- Install from the [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=hamzawaleed.glance-claude-code), or search **Glance for Claude Code** in the Extensions panel.
- Click the Glance icon in the activity bar, hit **+ New Session** (or `Cmd+Shift+G` / `Ctrl+Shift+G`).
- Spawn a few more. Watch them work.

A 30-second welcome tour pops up on first install to point out the activity-bar icon and the shortcuts; you can re-open it any time via **Glance: Show Welcome Tour** in the Command Palette.

Source is on GitHub at [hamzawaleed0102/glancer-vscode](https://github.com/hamzawaleed0102/glancer-vscode). Issues and PRs welcome.
