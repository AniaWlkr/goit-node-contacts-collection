const Joi = require("joi")

const userSchema = Joi.object({
  password: Joi.string().min(7).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().allow("starter", "pro", "business").only(),
  token: Joi.string(),
  avatarURL: Joi.string(),
  avatarCloudId: Joi.string(),
  isVerified: Joi.boolean(),
  verifyToken: Joi.string(),
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().allow("starter", "pro", "business").only(),
})

module.exports = { userSchema, subscriptionSchema }
