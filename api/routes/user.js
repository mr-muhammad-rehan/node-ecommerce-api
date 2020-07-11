const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/signup', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'Email Already Exists'
                });
            } else {
                bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
                    if (err) {
                        res.status(201).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        }).save()
                            .then(result => {
                                console.log(result);
                                res.status(201).json({
                                    message: 'user created successfully',
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                });
                            })
                    }
                });
            }
        })
});


router.post('/login', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "Auth Faild"
                });
            } else {

                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: 'Auth Faild'
                        });
                    }
                    if (result) {
                        const tocken = jwt.sign({
                            email: user[0].email,
                            userId: user[0]._id
                        },
                            'secrete',
                            {
                                expiresIn: "1h"
                            },

                        );
                        return res.status(200).json({
                            message: "Auth Successfull",
                            tocken: tocken
                        });
                    }
                    return res.status(401).json({
                        message: "Auth Faild"
                    });
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err
            });
        })
});


router.delete('/:userId', (req, res, next) => {
    const userId = req.body.userId;

    User.deleteOne({ _id: userId })
        .exec()
        .then((result) => {
            console.log(result);
            res.status(200).json({
                message: 'User Deleted Successfully'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;