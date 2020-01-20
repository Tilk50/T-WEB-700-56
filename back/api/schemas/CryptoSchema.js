const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cryptoSchema = new Schema({
   _id: Schema.Types.ObjectId,
    name: {
      type: String,
        required: true
    },
    symbol: {
       type: String
    },
    creation_date: {
       type: Date,
        default: Date.now()
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
    quote: {
       USD: {
           price: {
               type: Number
           },
           volume_24h: {
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
           last_update: {
               type: Date,
               default: null
           }
       }
    },
    create_date: {
       type: Date,
        default: Date.now()
    },
    show_in_list: {
       type: Boolean,
        default: true
    }
});

module.export = mongoose.model('Crypto', cryptoSchema);
