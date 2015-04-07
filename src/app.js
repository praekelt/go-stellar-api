var express = require('express'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    errors = require('./errors'),
    defaults = require('./defaults');


var app = express()
  .set('conf', defaults())
  .use(bodyParser.json())
  .use(routes)
  .use(errors.internal);


module.exports = app;
