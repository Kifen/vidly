const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
   name: {type: String, minLength: 3, maxLenght: 25, required: true},
   email: {
       type: String,
       unique: true,
   },
    password: {type: String, minLength: 8, required: true}
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
    const schema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    }

    return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;