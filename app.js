const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const restaurants = require('./api/restaurants');


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use('/api/restaurants', restaurants);

const port = process.env.PORT || 3001;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = app;