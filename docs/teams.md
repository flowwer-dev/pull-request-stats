# Posting to Microsoft Teams

This action can post the results to a channel in Teams. For example:

![](/assets/teams.png)

To configure the Teams integration:

1. [Create a webhook](https://learn.microsoft.com/en-us/microsoftteams/platform/webhooks-and-connectors/how-to/add-incoming-webhook) in the Channel you want the stats to be published (you must be an admin). You can set `Pull Request Stats` as the **name** and you may download [this file](https://s3.amazonaws.com/manuelmhtr.assets/flowwer/logo/logo-1024px.png) as the **image**. For  It should look like this: `https://abcXXX.webhook.office.com/webhookb2/AAAAAA@BBBBBBBB/IncomingWebhook/XXXXXXXXXX/YYYYYY`. Check out [this tutorial](https://www.youtube.com/watch?v=amvh4rzTCS0) if you have questions about getting the webhook URL.
2. Set the `teams-webhook` (from the previous step) parameter in this action.
3. Ready to go!

Since it may be pretty annoying to receive a Teams notification every time someone creates a pull request, it is recommended to configure this action to be executed every while using the `schedule` trigger. For example, every Monday at 9am UTC:

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
          teams-webhook: 'https://abcXXX.webhook.office.com/webhookb2/...'
          # teams-webhook: ${{ secrets.TEAMS_WEBHOOK }} You may want to store this value as a secret.
```
