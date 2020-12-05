var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var exphbs  = require('express-handlebars');
var flash = require('connect-flash');
var passport = require('passport');
var session = require('express-session'); 
var favicon = require('serve-favicon')

const db = require("./models");

var indexRouter = require('./routes/index');

var app = express();

db.sequelize.sync();
require('./passport/authenticator');

app.engine('hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: __dirname + '/views/partials',
    extname: '.hbs',
    helpers: require('./lib/helpers')
}));
app.set('view engine', 'hbs');
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: "clave secreta",
    resave: false,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.messageSuccess = req.flash('messageSuccess')
    res.locals.messageFailure = req.flash('messageFailure')
    next();
})

app.use((req, res, next) => {
    res.locals.login = req.isAuthenticated();
    next();
});

app.use('/', indexRouter);

module.exports = app;
