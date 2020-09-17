const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/users');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id).then(user => {
			const usr = {
				_id: user._id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName
			};

			done(null, usr);
		}).catch(err => done(err))
	});

	passport.use('login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		User.findOne({
			email,
			password
		}).then(user => {
			console.log(user);
			if (!user) {
				return done(null, false)
			}
			return done(null, user);

		}).catch(err => done(err));

	}))



	/*if (email === "ejemplo@ejemplo.com" && password === "12345") {
			return done(null, user={
				id: 1,
				name: "alguien"	
			}); 
		}

		done(null, false);*/


}