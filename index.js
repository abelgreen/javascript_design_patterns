
//import{express} from 'express';
const express = require('express');
const Router = require('./app/router');
const port = process.env.PORT || 3000;

const app = express();
Router(app);

app.listen(port, function (err) {
    'use strict';
  if (err) {
    throw err;
  }
  console.log(`server is listening on ${port}...`);
});

  