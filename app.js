var express = require('express');
var http = require('http');
var path = require('path');
var config = require('./config');
var log = require('./libs/log')(module);
var mongoose = require('./libs/mongoose');
var HttpError = require('./error').HttpError;

var app = express();
//app.set('port', config.get('port'));

//шаблонизация
app.engine('ejs', require('ejs-locals')); //layout partial block
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(express.favicon());

if(app.get('env') == 'development'){
  app.use(express.logger('dev'));  //res.end
} else {
  app.use(express.logger('default'));
}

//form json,... доступные данные в eq.body
app.use(express.bodyParser());

//доступные данные в req.cookies
app.use(express.cookieParser());

app.use(express.session({
  secret: config.get('session:secret'),
  key: 	config.get('session:key'),
  cookie: config.get('session:cookie')
}));

app.use(require('./middleware/sendHttpError'));
app.use(require('./middleware/loadUser'));

//маршрутизатор методов запросов get, post, put,.. app.get('/', req, res, next)
app.use(app.router);

require('./routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

//отлов ошибок и определение состояния (development or prodacshen)
app.use(function(err, req, res, next){
  if (typeof err == 'number') { // next(404);
    err = new HttpError(err);
  }

  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') == 'development') {
      express.errorHandler()(err, req, res, next);
    } else {
      log.error(err);
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
});

http.createServer(app).listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});