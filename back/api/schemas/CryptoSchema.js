const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
    coinMarketId: Number,
    name: {
      type: String,
        required: true
    },
    symbol: {
       type: String
    },
    max_supply: {
       type: Number
    },
    circulation_supply: {
       type: Number
    },
    total_supply: {
       type: Number
    },
    last_update: {
       type: Date,
        default: null
    },
    price: {
        type: Number
    },
    percent_change_1H: {
        type: Number
    },
    percent_change_24H: {
        type: Number
    },
    percent_change_7D: {
        type: Number
    },
    market_cap: {
        type: Number
    },
    create_date: {
       type: Date,
        default: Date.now()
    },
    show_in_list: {
       type: Boolean,
       default: true
    },
    history: [
        {
            type: Schema.Types.ObjectId,
            ref: "prices"
        }
    ]

});

module.exports = cryptoSchema;
