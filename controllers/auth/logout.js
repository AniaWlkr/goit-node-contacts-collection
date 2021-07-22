const { users: service } = require("../../services")

const logout = () => {
  const id = req.user.id
  return service.updateUserToken(id, null)
}

module.exports = logout
