const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const ejs= require('ejs');
 
const app = express();

 
 app.use(morgan('dev'));
 app.use(cookieParser('secret'));
 app.use(bodyParser.urlencoded({
	extended: false
}));


app.use(session({
	secret: 'aquiestoy',
	resave: false,
	saveUninitialized: false
}));

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());



const {url} = require('./config/database.js');

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//esta indica las rutas al documentp rutas
require('./app/routes.js')(app, passport);


app.listen(app.get('port'), () =>
	console.log('server on port', app.get('port')));