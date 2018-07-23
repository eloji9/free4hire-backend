const express = require ('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model.js');

const router = express.Router();

// POST /signup
router.post('/signup', (req, res, next) => {
    const {firstName, lastName, email, originalPassword,role} = req.body;
    if (originalPassword === '' || originalPassword.match(/[0-9]/) === null) {
        // create an error object for "next(err)"
        const err = new Error('Password cannot be blank and must have a number');
        next(err);
        return;
    }
    // we are ready to save the user if we get this far
    const encryptedPassword= bcrypt.hashSync(originalPassword, 10);

    User.create({firstName, lastName, email, encryptedPassword, role})
    .then((userDoc) => {
        // log the user in immediatly after signing up
        req.login(userDoc, () => {
            // hide encryptedPassport before sending the JSON(it's a security risk)
            userDoc.encryptedPassword = undefined;
            res.json({userDoc});
        });
    })
    .catch((err) => {
        next(err);
    })
})

// POST /login
router.post('/login', (req, res, next) => {
    const {email, loginPassword} = req.body;
    // Check the email in the database
    User.findOne({email})
    .then((userDoc) => {
        // Create and error object for next(err)
        if (!userDoc) {
            const err = new Error('Email not found');
            next(err);
            return;
        }
    // ready to check the password if we get this far
    const {encryptedPassword} = userDoc;
        if (!bcrypt.compareSync(loginPassword, encryptedPassword)) {
            const err = new Error('Wrong password');
            next(err);
            return;
        }
    // we are ready to log them in if we get this far
        req.logIn(userDoc, () => {
            userDoc.encryptedPassword = undefined;
            res.json({userDoc});
        });
    })
    .catch((err) => {
        next(err);
    });
});

// DELETE /logout
router.delete('/logout', (req, res, next) => {
    req.logOut();
    res.json({userDoc: null});
});

// GET ???
router.get('/checklogin', (req,res,next) => {
    if (req.user) {
        req.user.encryptedPassword = undefined
    }
    res.json({userDoc: req.user})
})

module.exports = router;