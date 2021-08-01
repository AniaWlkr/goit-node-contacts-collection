const Joi = require("joi")

const userSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().allow("starter", "pro", "business").only(),
  token: Joi.string(),
  avatar: Joi.string(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().allow("starter", "pro", "business").only(),
})

module.exports = { userSchema, subscriptionSchema }
