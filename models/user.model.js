const { Schema, model } = require("mongoose")
const bcrypt = require("bcryptjs")
const SALT_FACTOR = 6
const gravatar = require("gravatar")

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: {
      values: ["starter", "pro", "business"],
      message: "This type of subscription doesn't exist",
    },
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  avatarURL: {
    type: String,
    default: function () {
      return gravatar.url(this.email)
    },
  },
})

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(SALT_FACTOR))
}

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

const User = model("user", userSchema)

module.exports = User
