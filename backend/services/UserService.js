const {User, validate} = require('../models/user');
const bCrypt = require('bcrypt');
const _ = require('lodash');
const mongoose = require('mongoose');

exports.fetchUsers = async function(req, res) {
    const users = await User.find({},{'password':0}).sort('name');
    res.send(users);
};

exports.createUser = async function(req, res) {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if (user) return res.status(400).send('User already exists');

    user = new User({ name: req.body.name, email: req.body.email, password: req.body.password });
    const salt = await bCrypt.genSalt(10);
    const userPassword = await bCrypt.hash(user.password, salt);
    user.password = userPassword;
    user = await user.save();
    
    res.send(_.pick(user, ['_id', 'name', 'email']));
}
