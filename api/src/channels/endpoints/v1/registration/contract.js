/**
 * Created by leonardo on 12/9/16.
 */

const Joi = require('joi');

const contract = {
  payload: {
    message: Joi.string().min(1).max(20).required(),
  }
};

module.exports = contract;