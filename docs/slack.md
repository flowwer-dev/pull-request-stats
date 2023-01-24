# Posting to Slack

This action can post the results to a channel in Slack. For example:

![](/assets/slack.png)

To configure the Slack integration:

1. [Create a webhook](https://slack.com/help/articles/115005265063-Incoming-webhooks-for-Slack) in your workspace (you must be a Slack admin). It should look like this: `https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`. Check out [this tutorial](https://www.youtube.com/watch?v=6NJuntZSJVA) if you have questions about getting the webhook URL.
2. Set the `slack-webhook` (from the previous step) and `slack-channel` (don't forget to include the `#` character) parameters in this action.
3. Ready to go!

Since it may be pretty annoying to receive a Slack notification every time someone creates a pull request, it is recommended to configure this action to be executed every while using the `schedule` trigger. For example, every Monday at 9am UTC:

```yml
name: Pull Request Stats

on:
  schedule:
    - cron:  '0 9 * * 1'

jobs:
  stats:
    runs-on: ubuntu-latest
    steps:
      - name: Run pull request stats
        uses: flowwer-dev/pull-request-stats@master
        with:
          slack-channel: '#mystatschannel'
          slack-webhook: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX'
          # slack-webhook: ${{ secrets.SLACK_WEBHOOK }} You may want to store this value as a secret.
```
