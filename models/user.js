const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
   name: {type: String, minLength: 3, maxLenght: 25, required: true},
   email: {type: String, unique: true},
    password: {type: String, minLength: 8, required: true},
    isAdmin: {type: Boolean, default: false, required: true}
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('jwtPrivateKey'));
    return token;
};

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    };

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;