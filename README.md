# Push Server

Enabling push notifications on the web. This server uses [hapi](http://hapijs.com/) for the API, Mongo for the database, and the [web-push](https://github.com/web-push-libs/web-push) Node.js library to send push notifications.

## Install
```
npm install
```

A postinstall script will run and create a .env file that needs to have a GCM_API_KEY value set. If you don't already have a GCM_API_KEY, follow the directions on [Implementing GCM Client on Chrome](https://developers.google.com/cloud-messaging/chrome/client)\*.

\* All of this may need to change soon since [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging/) is replacing GCM.

## Run
```
npm start
```
This will start nodemon and will automatically restart anytime the code is modified and saved.

## Routes

### GET /health

A simple route that will respond with "Healthy" if the server is up and running.

### POST /register

Expects an application/json payload with the following structure:
```
{
  "endpoint": "(the endpoint string provided by the browser)",
  "keys": {
    "p256dh": "(public key provided by the browser)",
    "auth": "(auth key provided by the browser)"
  }
}
```

### POST /unregister

Work in progress.

### POST /notify

Currently this route sends push notifications to all of the subscriptions in the database. This, of course, will need to change.

Expects an application/json payload with the following structure:
```
{
  "message": {
    "title": "The title you want for your notification (required)",
    "body": "The body of your notification (required)",
    "icon": "url to the icon you want displayed (optional)",
    "data": { *** any additional data you want to send *** (optional) }
  }
}
```

### POST /track

Work in progress.
