const passport = require('passport');
const User = require('../models/user-model.js');

passport.serializeUser((userDoc, done) => {
    // save the user's Id inside the session
    done(null, userDoc._id);
});

passport.deserializeUser((idFromSession, done) => {
    User.findById(idFromSession)
    .then((userDoc) => {
        done(null, userDoc);
    })
    .catch((err) => {
        done (err);
    })
});

function passportSetup(app) {
    // add passport features to our routes
    app.use(passport.initialize());
    app.use(passport.session());
}

module.exports = passportSetup;