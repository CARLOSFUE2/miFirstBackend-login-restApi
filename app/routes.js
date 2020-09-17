const Promos = require('../app/models/promos');
const User = require('../app/models/users');
let { promotions, getPromotions}= require('../controllers/promotions');
let userAuthenticate
module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	app.get('/login', (req, res) => {
		res.render('login');

	});
	app.get('/signup', (req, res) => {
		res.render('signup');
	});

	app.get('/formulary', isLoggedIn, (req, res) => {
				console.log(req.user);

		res.render('formulary', {user: req.user})
	});

	app.post('/login',passport.authenticate('login', {
		successRedirect: '/formulary',
		failureRedirect: '/login'}) 
	);

	app.post('/formulary', isLoggedIn, (req, res) => {
		//con los 3 puntos de abajo clono los datos que ya vienen por defecto que son los datos del body y se le agrega el objeto usuario :o
		const data= {
			...req.body,
			user: req.user};
		Promos.create(data, function(err, document) {
			if (err) return handleError(err);
			//render te muestra una vista nada mas, encambio redirect te reenvia a otra funcion.
			res.redirect('/promos');
		});
	});

	app.post('/signup', (req, res) => {
		console.log(req.body);
		User.create(req.body, function(err, document) {
			if (err) return handleError(err);
			res.render('login');
		});
		});

	app.get('/promos', (req, res) => {
		Promos.find({}).then(docs=> {
			res.render('promos', {docs: docs});
		}).catch(err => console.log(err))
	});

	app.get('/promotions', promotions );

	 app.get('/promotions/:promosId', getPromotions );


	app.post('/promos', (req, res) => {
		res.render('promos');

	});


	function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
}



