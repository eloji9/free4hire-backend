const express = require ('express');
const bcrypt = require('bcrypt');
const bodyparser = require("body-parser");

const User = require('../models/user-model.js');

const router = express.Router();

// POST /signup
router.post("/signup", bodyparser.json(), (req, res, next) => {
  const {
    firstName,
    lastName,
    originalPassword,
    email,
    adress,
    phone,
    role,
  } = req.body;
  if (originalPassword === "" || originalPassword.match(/[0-9]/) === null) {
    const err = new Error("Password can't be blank and must have a number");
    next(err);
    return;
  }

  const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

  User.create({
    firstName,
    lastName,
    encryptedPassword,
    email,
    adress,
    phone,
    role,
  })
    .then(userDoc => {
      req.login(userDoc, () => {
        userDoc.encryptedPassword = undefined;
        res.json({ userDoc });
      });
    })
    .catch(err => {
      next(err);
    });
});

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

// GET ALL THE USERS
router.get("/users",(req,res,next) => {
    User
    .find()
    .then((userResults) => {
        console.log(userResults);

        res.json(userResults);
    })
    .catch((err) => {
        next(err);
    });
});

// GET ONE USER
router.get('/user/:workerId', (req,res,next) => {
    const workerId = req.params.workerId;
    User.findById(workerId)
    .then((workerDoc) => {
        if (!workerDoc) {
            next();
            return;
        }
        res.json(workerDoc);
    })
    .catch((err) => {
        next(err);
    });
})

module.exports = router;