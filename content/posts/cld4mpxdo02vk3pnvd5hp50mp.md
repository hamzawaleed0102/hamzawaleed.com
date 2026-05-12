# Building a Slack Bot for Fun and Profit: A Guide to Using Slack Bolt JS SDK

Hey there! Have you ever wanted to create your own Slack bot to automate some tasks or just have some fun with your team? Well, you're in luck because it's quite easy to do with the Slack Bolt JS SDK. In this post, I'll walk you through the process of creating a simple Slack bot using the SDK.

> Before diving into this guide on creating a Slack bot, check out my recent project, an anonymous messaging bot. Read the article here: [Launching Anony Botter](https://hamzawaleed.com/anony-botter-send-anonymous-message-on-slack)
> 
> In this article, I'll be sharing the skills I gained from building this bot so you can build your own custom bot for your team's needs.

First things first, you'll need to create a new Slack app. Go to the [Slack API website](https://api.slack.com/) and create a new app. Once you've created your app, you'll be given a `SLACK_APP_TOKEN` and a `SLACK_BOT_TOKEN`. Make sure to save these as you'll need them later.

Next, you'll need to install the Slack Bolt JS SDK. You can do this by running the following command:

```bash
npm install @slack/bolt
```

Now that you have the SDK installed, you can start building your bot. Create a new JavaScript file and import the SDK. Here's an example of what your code might look like in `bot.js`:

```javascript
const { App } = require('@slack/bolt');
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
});
```

Now, you'll need to add some functionality to your bot. Let's say you want your bot to respond to a specific message. You can do this by using the `message.hear` function in the SDK. Here's an example:

```javascript
app.message('hello', ({ message, say }) => {
  say(`Hello, <@${message.user}>!`);
});
```

In this example, the bot will respond with "Hello, @username!" whenever someone types "hello" in a Slack channel where the bot is a member.

Now, you'll need to start your bot by running the following command:

```javascript
SLACK_APP_TOKEN=xoxb-xxx SLACK_BOT_TOKEN=xoxb-xxx node bot.js
```

And that's it! You've just created a simple Slack bot using the Slack Bolt JS SDK. You can now add more functionality and make your bot as complex or as simple as you want. Have fun!

Now that you've got the basic setup for your Slack bot, you can start adding more functionality to make it more useful. One thing you might want to do is make your bot interactive. Slack offers a few different ways to do this, such as using buttons and dialogs.  

Buttons are a great way to add some interactivity to your bot. You can use them to give users options to choose from, or to trigger a specific action. To add a button to your bot, you'll need to use the `message.respond` function in the SDK. Here's an example:

```javascript
app.message('what can you do', ({ message, say }) => {
  say({
    blocks: [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "I can do a lot of things! Here are a few examples:"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Option 1"
          },
          "value": "option_1"
        }
      },
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": "I can also do Option 2"
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Option 2"
          },
          "value": "option_2"
        }
      }
    ]
  });
});
```

In this example, the bot will respond with a message that has two buttons labeled "Option 1" and "Option 2" when someone types "what can you do" in a channel where the bot is a member.

## /Slash command and dialogs

Dialogs are another way to make your bot interactive. They allow users to submit information to your bot in a more structured way. For example, you can use a dialog to let users create new tasks or submit feedback. To use dialogs in your bot, you'll need to use the [`dialog.open`](http://dialog.open) function in the SDK. Here's an example:

```javascript
app.command("/create_task", async ({ command, ack, say, context }) => {
    ack();
    try {
      const result = await app.client.dialog.open({
        token: context.botToken,
        trigger_id: command.trigger_id,
        dialog: {
            callback_id: "create_task",
            elements: [
                {
                label: "Task name",
                type: "text",
                name: "task_name"
                },
                {
                label: "Description",
                type: "textarea",
                name: "task_description"
                },
                {
                label: "Due date",
                type: "datepicker",
                name: "due_date"
                }
            ],
            submit_label: "Create"
        }
      });
    
    say(`Task "${result.task_name}" created!`);

    } catch (error) {
    console.error(error);
    say("Sorry, there was an error creating the task.");
    }
});   
```

> You also need to register this slash command under [**Interactivity & Shortcuts**](https://api.slack.com/apps/A04JHCLB807/interactive-messages?) section

In this example, the bot will open a dialog whenever `/create_task` is wrote, with three fields: "Task name", "Description", and "Due date" when someone types "/create\_task" in a channel where the bot is a member. Once the user submits the form, the bot will respond with a message saying that the task was created.

These are just a few examples of how you can make your Slack bot more interactive using buttons and dialogs. There are many other ways to make your bot more interactive, like using message actions, event listeners, etc. You can also use other features of the Slack Bolt JS SDK to add more functionality to your bot. Be sure to check out the official documentation to learn more.

In summary, creating a simple Slack bot using Slack Bolt JS SDK is quite easy and fun. You can start with basic functionality and keep adding more features as per your requirements. Remember to keep the code clean and readable, and don't hesitate to experiment with different features of the SDK to make your bot more useful and interactive. Happy bot building!