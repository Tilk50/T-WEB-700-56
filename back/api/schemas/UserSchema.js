const mongoose = require('mongoose');
const saltRounds = 10;
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
     admin: {
        type: Boolean,
         default: false
     },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "cryptos"
        }
    ],
    creationDate: {
        type: Date,
        default: Date.now()
    }
});

/**
 * Hash paswword
 */
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = userSchema;
