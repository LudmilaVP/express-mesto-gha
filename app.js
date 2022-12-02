const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routes = require('./routes');

const { PORT = 3000 } = process.env;
const app = express();
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '63889ef57b5d54bd8ee13d91',
  };

  next();
});

app.use(routes);

mongoose.connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
