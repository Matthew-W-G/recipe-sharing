const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
});

const saltRounds = 10;

userSchema.pre('save', function(next) {
    if(!this.isModified('passwordHash')) {
        return next();
    }

    bcrypt.hash(this.passwordHash, saltRounds, (err, hash) => {
        if(err) {
            next(err);
        } else {
            this.passwordHash = hash;
            next();
        }
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;
