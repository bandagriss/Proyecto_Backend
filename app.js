var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
const fileUpload = require('express-fileupload');

// var index = require('./routes/index');
var departamentos = require('./routes/departamentos');
var institucion = require('./routes/instituciones');
var roles = require('./routes/roles');
var usuarios = require('./routes/usuarios');
var financiadores = require('./routes/financiadores');
var proyectos = require('./routes/proyectos');
var fases = require('./routes/fases');
var autenticacion = require('./routes/auth');
var proyectoPersona = require('./routes/proyectoPersona');
var documentos = require('./routes/documentos');

var app = express();

// adicionando fileupload para subir archivos
app.use(fileUpload());

// adiciionando headers
app.use(cors({
  'Access-Control-Allow-Origin': '*',
  origin: '*',
  methods: 'GET, HEAD, PUT, PATCH, DELETE, OPTIONS',
  preflightContinue: true,
  headers: 'Cache-Control, Pragma, Content-Type, Authorization, Content-Length, X-Requested-With',
  'Access-Control-Allow-Headers': 'Authorization, Content-Type',
  'X-Frame-Options': 'SAMEORIGIN',
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', autenticacion);
app.use('/api/v1', [departamentos, institucion, roles, usuarios, financiadores, proyectos, fases, proyectoPersona, documentos]);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
