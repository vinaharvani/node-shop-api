const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.user_signup =  (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Mail already exists"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user
                            .save()
                            .then(result => {
                                console.log("user created response", result);
                                res.status(200).json({
                                    message: "user created",
                                    result: {
                                        _id: result._id,
                                        email: result.email
                                    }
                                })
                            })
                            .catch(err => {
                                console.log("user created response error", err);
                                res.status(500).json({
                                    error: err
                                })
                            })
                    }
                })
            }
        })
}


exports.user_login =  (req, res, next) => {
    User.find({ email: req.body.email }).exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: "Mail not found, user doesn\t exists"
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    })
                }
                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    },
                );
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                }
                res.status(401).json({
                    message: "Auth failed.password incorrect"
                })
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
}

