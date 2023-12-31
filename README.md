﻿# eli-discord-bot

Pre-requirements:
- Node.JS (https://nodejs.org/en/download/)
- dotenv (npm install dotevn)
- node-fetch (npm install node-fetch)
- discord.js (npm install discord.js)

To use this bot we will need to both setup an application and bot within the Discord platform
and setup an API token within the Nightbot platform.

To start you should go to https://discord.com/developers/applications and login with your
Discord credentials.

Click on "New Application" and give the application a relevant name.

Next, click on the bot and go to OAtuh2 > URL Generator.

Tick the two boxes; applications.commands and bot.  For the sake of this bot I will grant
Administrator permissions for ease of use. However, you should setup the correct Access Control
List (ACL) within your Discord server to grant the bot the least amount  of permissions required.

There will be a generated URL that shows below.  You will want to copy and paste that URL into
a new browser. In order for you to be able to grant the bot access to the Discord server you must 
either be the server owner or have the manage server permission.

Create a file named .env which is where we will store all over our enviroment variables that we 
MUST keep secure. Treat all tokens that are generated as your password and do not give them out.

Back in the Discord developers applications panel we will want to navigate to Bot and click on 
"copy" under token.

In the .env add the following line:
DISCORD_BOT_TOKEN=your_token

Next, we will need to get the nightbot api token. To do this go to https://nightbot.tv and login
and follow the steps below:

Step 1) Click on your picture on the top right and go to Settings
Step 2) Click "New App"
Step 3) Put in "name_of_bot" for the name and "https://localhost/" for the Redirect URL and click Submit
Step 4) Click on the yellow pencil button to the right of "name_of_bot" under the "My Apps" section

Now, back in your .env file we will want to add the two entries:
NIGHT_BOT_CLIENT_SECRET=your_client_secret

In order to interact with the Nightbot API we will need to get an access code.  To obtain an access
code we will use the CURL command to do so.  Run the following CURL command in the command
prompt:

curl -X POST "https://api.nightbot.tv/oauth2/token" -d "client_id=your_client_id&client_secret=your_client_secret&grant_type=client_credentials&scope=commands"

Note: In this case we are only granting this permission to add, delete, or modify commands which is granted
by the scope in the end of the CURL command.

The CURL command will return a JSON file that includes your access_token.  Now in the .env file,
we will add this token in as follows:
NIGHT_BOT_ACCESS_TOKEN=bearer your_access_token

In the instance of this use case we will be updating a particular command.  The Nightbot API will need
the ID of the command in order to accecpt the PUT fetch request to update the command.  You can use 
a fetch GET CULR command to get the list of the commands and their ID by running the following:

curl -X GET "https://api.nightbot.tv/1/commands" -H "Authorization: Bearer your_access_token"

You can copy/paste the JSON into this website to make it easier to read: https://jsonformatter.org/json-pretty-print

In this use case we will be updating the !discord command so I copied the ID for that command and
added the following entry to the .env file:

DISCORD_COMMAND_URL_ID=https://api.nightbot.tv/1/commands/your_command_id

Now to let all the magic run and get the code running in a cloud hosted solution.  We will need to go
to https://www.heroku.com and create an account. All of your code must be in public repository on Github
for this to work and you must link your Github to  Heroku. Now here are the following steps to follow 
within the console:

Step 1) Click on "Create new app"
Step 2) Give the application a creative name and click Create app
Step 3) Under the deploy section, click on Github as the deployment method
Step 4) Select your Github and then type in the name of your repo and click search, then click connect
Step 5) Under Automatic Deployment click Enable
Step 6) In the settings tab we will add all the config vars, which are the enviroment variables 
in the .evn file
Step 7) Click on Add buildpack and select the offically supported nodejs
Step 8) Once the app is successfully deployed, go to the Resources tab, we will want to disable
web npm start and enable worker npm start
Step 9) Verify everything is working by clicking on the triple dots and clicking "View Log"

In order to not have to constantly keep creating apps to get a new access token, you can utilize the refresh token to get another access token.  Remember that access tokens last 30 days and refresh tokens last 60 days.

In order to get another access token and refresh token from an active refresh token we will use the following curl command:

curl -X POST "https://api.nightbot.tv/oauth2/token" -d "client_id=your_client_id" -d "client_secret=your_client_secret"  -d "grant_type=refresh_token" -d "refresh_token=your_active_refresh_token"

Reference(s):
https://api-docs.nightbot.tv/#introduction
https://www.youtube.com/watch?v=gBX7S9i74GU
