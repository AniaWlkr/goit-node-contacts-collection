const Joi = require("joi")

const userSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string(),
})

module.exports = userSchema
