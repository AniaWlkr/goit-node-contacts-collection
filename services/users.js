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

module.exports = {
  addUser,
  updateUserToken,
  findUserById,
  findUserByFilter,
}
