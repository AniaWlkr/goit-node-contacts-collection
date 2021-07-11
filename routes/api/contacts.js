const express = require("express")
const router = express.Router()
const { contacts } = require("../../controllers")

router.get("/", contacts.listContacts)

router.get("/:contactId", contacts.getContactById)

router.post("/", contacts.addContact)

router.delete("/:contactId", contacts.removeContact)

router.patch("/:contactId", contacts.updateContact)

module.exports = router
