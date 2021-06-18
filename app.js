const express = require('express');
const bodyParser = require('body-parser');

const categoryRoute = require('./routes/category');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');


const app = express();

app.use(bodyParser.json());

app.use("/category", categoryRoute);
app.use("/user", userRoute);
app.use("/blog", (blogRoute));

module.exports = app;
