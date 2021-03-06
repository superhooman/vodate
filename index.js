const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const express = require('express');

const {
  PORT, MONGO_URL, REDIS_URL, COOKIE_NAME, SESSION_SECRET
} = process.env;

const mongoose = require('mongoose');
const Redis = require('ioredis');
const connectRedis = require('connect-redis');
const session = require('express-session');
const App = require('./server/app');

const UserController = require('./server/controllers/user');
const ProfileController = require('./server/controllers/profile');
const MatchController = require('./server/controllers/match');

const RedisStore = connectRedis(session);
const redisClient = new Redis(REDIS_URL);

const app = new App({
  port: PORT,
  controllers: [
    new UserController(),
    new ProfileController(),
    new MatchController()
  ],
  middleWares: [
    express.json(),
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 48,
        httpOnly: true,
        sameSite: 'lax', // csrf
      },
      saveUninitialized: false,
      secret: SESSION_SECRET,
      resave: false,
    }),
  ],
  static: [
    {
      path: '/uploads',
      folder: path.join(process.cwd(), 'uploads'),
    },
  ],
});

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen();
