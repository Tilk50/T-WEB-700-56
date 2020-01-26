const mongoose = require('mongoose');
const saltRounds = 10;
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: Schema.Types.ObjectId,
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
    confirmPassword: {
      type: String,
      required: true
    },
    favorites: [
        {
            type: Schema.Types.ObjectId,
            ref: "Crypto"
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

    this.password = bcrypt.hashSync(this.password, saltRounds)
});

module.export = mongoose.model('User', userSchema);
