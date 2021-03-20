const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });

const {
  PORT, MONGO_URL
} = process.env;

const mongoose = require('mongoose');
const App = require('./server/app');

const app = new App({
  port: PORT,
  controllers: [
  ],
  middleWares: [
    express.json()
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
