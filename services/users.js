const { User } = require("../models")

const addUser = (userData) => {
  const user = new User(userData)
  const { password } = userData

  user.setPassword(password)
  return user.save()
}

const updateUserToken = (id, token) => {
  return User.findByIdAndUpdate(id, { token })
}

const updateUserSubscription = (id, subscription) => {
  return User.findByIdAndUpdate(id, { subscription })
}

const findUserById = (id) => {
  return User.findById(id)
}

const findUserByFilter = (filter) => {
  return User.findOne(filter).exec()
}

const updateAvatar = (id, avatarPath) => {
  return User.findByIdAndUpdate(id, { avatarURL: avatarPath })
}

module.exports = {
  addUser,
  updateUserToken,
  updateUserSubscription,
  findUserById,
  findUserByFilter,
  updateAvatar,
}
