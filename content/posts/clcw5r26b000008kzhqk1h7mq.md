---
title: "Anony Botter: Anonymous feedback your team actually trusts, built for Slack"
seoTitle: "Anony Botter: Anonymous messages, polls, and replies for Slack"
seoDescription: "A free Slack bot for anonymous messages, polls, and thread replies — with built-in moderation, approval workflows, and AI guardrails."
datePublished: Sat Jan 14 2023 16:23:32 GMT+0000 (Coordinated Universal Time)
cuid: clcw5r26b000008kzhqk1h7mq
slug: anony-botter-send-anonymous-message-on-slack
cover: /blog-images/anonybotter-hero.png
tags: projects, saas

---

I launched Anony Botter — a free Slack bot for anonymous messages and polls — as a side project in early 2023. Three years on, it has grown into a real product. Here's what it does today.

![Anony Botter hero](/blog-images/anonybotter-hero.png)

Anony Botter lets your team send anonymous messages, run anonymous polls, and reply anonymously inside Slack threads. The bot posts everything under its own account — Slack identity never enters the payload, so even workspace admins can't trace authorship unless audit mode is explicitly enabled and disclosed to every user.

## Why teams pick it

![Three reasons teams switch to Anony Botter](/blog-images/anonybotter-pillars.png)

Three things keep the experience workable in actual teams:

- **True anonymity.** The bot owns the post. Your Slack name and avatar never appear.
- **Built-in moderation.** Five-downvote auto-hide, one-click flagging, AI rewrites of hostile drafts before they post, banned-topic enforcement, and an approval queue with AI-generated review summaries.
- **Free forever.** A generous free tier (20 messages + unlimited polls, no credit card). Paid tiers are flat-rate per workspace — never per user.

## Features

The bot now ships with nineteen surfaces — slash commands, thread pseudonyms, channel whitelisting, broadcast prevention, auto-translation, AI mod summaries, audit mode, and more.

![Features grid](/blog-images/anonybotter-features.png)

The ones I lean on most: thread pseudonyms (stable aliases like "Curious Sparrow" plus an OP badge, so you can tell repliers apart without unmasking anyone), per-channel toggles for messages/threads/reactions, and the tone coach that intercepts hostile drafts with a softer AI rewrite before posting.

## How it works

![Three-step install: OAuth, /anony, post](/blog-images/anonybotter-how.png)

Install via OAuth, type `/anony` in any channel the bot is in, and it posts on your behalf. No SSO project, no new logins, no per-user seat math.

## Pricing

![Three pricing tiers: Free, Plus, Enterprise](/blog-images/anonybotter-pricing.png)

Three tiers, all priced per workspace:

- **Free** — $0 forever. 20 messages then 3/day, unlimited polls, anonymous replies, broadcast prevention, channel coverage.
- **Plus** — $7/mo. Unlimited anonymous messages and replies plus community flagging and auto-hide.
- **Enterprise** — $26.99/mo. Approval workflow, banned-topic AI enforcement, tone coach, AI mod summaries, auto-translate, audit mode, channel whitelist.

A 500-person workspace pays the same as a 5-person one on the same tier — your headcount never moves the bill.

## Tech stack

Built on Slack's Bolt JS SDK and Node, hosted on Vercel, with MongoDB Atlas for the small amount of data the bot keeps. The bot stores only the workspace ID, OAuth tokens, settings, and posted anonymous content. User profiles, emails, and DMs are never stored. Uninstalling a workspace wipes its record entirely.

## Try it

Visit [anonybotter.hamzawaleed.com](https://anonybotter.hamzawaleed.com/) and click **Add to Slack** to install. Then run `/anony` in any channel the bot is invited to. The free tier needs no credit card.
