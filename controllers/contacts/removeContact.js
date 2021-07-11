const contacts = require("../../model/contacts.json")

const removeContact = async (req, res) => {
  const { contactId } = req.params

  const contactIndex = contacts.findIndex((contact) => contact.id === Number(contactId))
  if (!contactIndex === -1) {
    return res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    })
  }

  const newContacts = contacts.filter((contact) => contact.id !== Number(contactId))

  fs.writeFile(dbPath, JSON.stringify(newContacts))

  res.status(200).json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  })
}

module.exports = removeContact
