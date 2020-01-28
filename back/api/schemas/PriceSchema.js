const mongoose = require('mongoose');
const Schema = mongoose.Schema

const priceSchema = new Schema ({
    update_date: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = priceSchema;
