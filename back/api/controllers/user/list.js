'use strict';

const mongoose = require('mongoose');
const userSchema = require('../../schemas/UserSchema');
const User = new mongoose.model('user', userSchema);
const boom = require('@hapi/boom');

const list = function (req, res, next) {
  let count = 0;
  let filter = buildFilter(JSON.parse(req.query.filter));
  // This query is used to get the total count
  User.find(
      filter
  ).exec(function (err, result) {
      if (err) {
          console.log(err)
          return next(boom.internal("Internal server error"));
      }
      count = result.length;
      // This query is used to get the data
      User
          .find((filter))
          .limit(parseInt(req.query.rowsRequest))
          .sort([[req.query.sortBy, parseInt(req.query.desc)]])
          .skip(parseInt(req.query.startRow))
          .select('-password')
          .exec(function(err, result) {
              if (err) {
                  console.log(err)
                  return next(boom.internal("Internal server error"));
              }
              // Return response to front
              res.json({list: result, totalRow: count});
          });
  });
};

function buildFilter(queryFiler) {
    let filter = {};

    if (typeof queryFiler.email !== 'undefined' && queryFiler.email !== '') {
        filter.email = new RegExp(queryFiler.email, '');
    }

    if (typeof queryFiler.admin !== 'undefined') {
        filter.admin = queryFiler.admin;
    }

     return filter;
}

module.exports = list;
