'use strict';

const mongoose = require('mongoose');
const config = require('config/package');
const boom = require("@hapi/boom");
const User = require('../../schemas/UserSchema');
const jwt = require('jsonwebtoken/package');

const authenticator = {
  isAuthenticated: async function (req, res, next) {
      let token = req.headers.authorization.replace('Bearer', '');
        jwt.verify(token, config.secretKey, async  function (err, decoded) {
           if (err) {
               return next(boom.forbidden("Invalid token"))
           } else {
               await User.findById(decoded._id, "-password", function (err, user) {
                    if (err) return next(boom.badRequest("User not found"));
                    req.currentUser = user;
                    next();
               })
           }
        });
  },

  isAdmin: function () {
      return (req, res, next) => {
          if(!req.currentUser.admin) {
              return next(boom.forbidden("Permission denied"));
          } else {
              next();
          }
      }
  }
};
