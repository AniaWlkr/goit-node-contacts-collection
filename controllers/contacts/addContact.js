const { v4 } = require("uuid")
const contacts = require("../../model/contacts.json")
const fs = require("fs/promises")

const path = require("path")
const dbPath = path.join(__dirname + "/../../model/contacts.json")

const { contactSchema } = require("../../utils/validate/schemas")

const addContact = async (req, res) => {
  const { error } = contactSchema.validate(req.body)
  if (error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "Missing required name field or invalid data entered",
    })
  }
  const newContact = {
    id: v4(),
    ...req.body,
  }

  const newContacts = contacts ? [...contacts, newContact] : newContact
  fs.writeFile(dbPath, JSON.stringify(newContacts))

  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      result: newContact,
    },
  })
}

module.exports = addContact
