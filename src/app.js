var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    errors = require('./errors'),
    defaults = require('./defaults');


var app = express()
  .set('conf', defaults())
  .use(logger('dev'))
  .use(bodyParser.json())
  .use(routes)
  .use(errors.internal);


module.exports = app;
