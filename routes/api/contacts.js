const express = require("express")
const router = express.Router()
const { contacts } = require("../../controllers")
const { checkToken } = require("../../middleware")

router.get("/", checkToken, contacts.listContacts)
router.post("/", checkToken, contacts.addContact)
router.get("/:contactId", checkToken, contacts.getContactById)
router.delete("/:contactId", checkToken, contacts.removeContact)
router.put("/:contactId", checkToken, contacts.updateContact)
router.patch("/:contactId/favorite", checkToken, contacts.updateContactStatus)

module.exports = router
