# Snappy chat app

## What is it?

It is a web app which simulates an online real-time chat.

![App working](https://github.com/gferreiraDev/snappy_chat_app/blob/main/chat_app/src/assets/snappy.gif)

## What was developed with?

It was developed with ReactJs, NodeJs, Express, Socket.io, MongoDB and other libs.

## How to run the app?

1. Install the chat_app dependencies
```
  cd chat_app
  yarn install
```
2. Install the server dependencies
```
  cd server
  yarn install
```
3. Set the PORT and MONGO_URL variables in the *.env* file, as shown in *.env.example*
~~~javascript
  PORT= //port name here
  MONGO_URL= //your url here
~~~
4. Run both front and backend by using **yarn start**

5. Enjoy the app.
