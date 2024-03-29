var User = require('../models/user').User;
var HttpError = require('../error').HttpError;
var AuthError = require('../models/user').AuthError;
var async = require('async');

exports.get = function(req, res) {
    res.render('login');
};

exports.post = function(req, res, next) {
    // ... bodyParser()
    var username = req.body.login;
    var password = req.body.pass;

    console.log(username);
    console.log(password);

    // Подключ. Model User для поиска в БД
   User.authorize(username, password, function(err, user) {
        if (err) {
            if (err instanceof AuthError) {
                return next(new HttpError(403, err.message));
            } else {
                return next(err);
            }
        }

        req.session.user = user._id;
        res.send({});

        console.log(user.get('username') + " -Console");
    });
};