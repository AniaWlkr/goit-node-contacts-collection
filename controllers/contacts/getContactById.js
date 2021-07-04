const contacts = require("../../model/contacts.json")

const getContactById = async (req, res) => {
  const { contactId } = req.params

  if (!contactId) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Incorrect id. Not found",
    })
  }

  const selectedContact = contacts.find((contact) => contact.id === Number(contactId))

  res.json({
    status: "success",
    code: 200,
    data: {
      result: selectedContact,
    },
  })
}

module.exports = getContactById
