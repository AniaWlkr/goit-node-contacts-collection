const contacts = require("../../model/contacts.json")

const listContacts = async (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
    },
  })
}

module.exports = listContacts
