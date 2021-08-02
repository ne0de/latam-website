var express = require('express');
var exphbs = require('express-handlebars');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var flash = require('connect-flash');
var passport = require('passport');
var favicon = require('serve-favicon')

/* database */
const db = require("./models");
db.sequelize.sync();

/* routes */
var indexRouter = require('./routes/index');

var app = express();

/* middlewares */

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
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use(session({
    secret: "clave secreta",
    resave: false,
    saveUninitialized: true
}));

/* passport */
app.use(passport.initialize());
app.use(passport.session());
require('./passport/authenticator');

/* flash messages */
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
