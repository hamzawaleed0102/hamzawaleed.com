---
title: "Introducing Anony Botter: The Slack Bot  for Open Communication in Teams"
seoTitle: "Anonymity Bot: Send anonymous messages on slack"
seoDescription: "Send unlimited free anonymous messages on slack. Use this Anonymity Bot to build better team communication experience."
datePublished: Sat Jan 14 2023 16:23:32 GMT+0000 (Coordinated Universal Time)
cuid: clcw5r26b000008kzhqk1h7mq
slug: anony-botter-send-anonymous-message-on-slack
cover: https://cdn.hashnode.com/res/hashnode/image/upload/v1674899889550/1abc5ad0-33e7-4427-8d1f-79af1e8d3e86.png
tags: projects, saas

---

I am thrilled to announce the launch of my first SaaS project: a free Slack bot that allows users to send anonymous messages, as well as participate in anonymous polls.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1673713029350/47e727f1-e094-4ad2-8df5-e42880c9035d.png align="center")

This bot, which I have been working tirelessly on for the past few months, is designed to promote open communication and collaboration within teams, without the constraints of social hierarchies or the fear of judgement.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1673713057825/8ab27c57-e0df-46ce-9ef9-2481f26b34d7.png align="center")

With this app, users can send anonymous messages to any member of the team, reply anonymously to any message, and vote up or down on messages. Inappropriate messages will automatically disappear when the majority of users downvote them. Additionally, users can post anonymous polls with up to five options, and other team members can vote anonymously as well.

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1673713075534/9e27fd26-fd7e-4426-a595-0ced9b392c0a.png align="center")

Here's how the poll looks when posted:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1673713108675/b59c6dd9-a5d0-4178-9269-a206e52c3589.png align="center")

When the majority of readers downvote a message, this is what happens:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1673713176898/0d21fb40-aa9d-43a7-a787-a192d3430dc3.png align="center")

**Update:** Based on the user's feedback, flagged messages can no longer be seen - That `View` button in the above screenshot - is no longer there. 😉

## Tech stack:

I made use of Slack's Bolt JS SDK and JavaScript. The Slack Bolt JS SDK is a powerful tool that's built for the easy creation of interactive, multi-dimensional Slack apps. It provides a simple, yet comprehensive set of functions that can be used to handle various events and commands on the bot.

This enabled me to create a bot with very less code, that can respond to any message, command, or event and gives me full control over the conversations and polls that happen using the bot.

Since I'm already a JS developer so understanding Bolt JS SDK wasn't a huge learning curve for me. I was able to quickly create this bot that is lightweight, fast and efficient.

I am hosting this on **Vercel** and using **MongoDB** to store the required data. For now, only auth tokens are being stored which are removed whenever the user uninstalls the app, ensuring that the user's data remains private and secure.

## Why this bot?

It's worth mentioning that while there are a few other anonymous bots available in the market, they can be quite expensive, with costs ranging over $500 per month for medium size of teams. However, my bot offers the same functionality free for now - a fraction of the cost in future, making it accessible to teams of all sizes.

In addition to this, I am also excited to announce that I am planning to release a paid version of this app in the coming weeks, which will include additional features and functionalities.

I am confident that this bot will be a valuable tool for teams everywhere, and I look forward to continuing to develop and improve it in the future.

## Try yourself!

If you're interested in installing the Anonymity Slack Bot in your workspace, you can easily do so by visiting [**<mark>Anonymity</mark>**](https://anonymity.webflow.io/). On this website, you'll find an [**<mark>Add to Slack</mark>**](https://anonymity.webflow.io/) button to integrate it into your Slack workspace.

Once installed, you'll be able to start using the bot right away and experience the benefits of anonymous communication and collaboration within your team.

To start using the bot, you can run `/anony` command in any Slack channel. The bot must be invited to private channels to work.

Thank you for your support and stay tuned for more exciting SaaS projects from me in the future.