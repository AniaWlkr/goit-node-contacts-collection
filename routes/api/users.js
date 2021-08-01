const express = require("express")
const router = express.Router()
const { users } = require("../../controllers")
const { checkToken, multerUpload } = require("../../middleware")

router.get("/current", checkToken, users.getCurrentUser)
router.patch("/", checkToken, users.updateUserSubscription)
router.patch("/avatar", checkToken, multerUpload.single("avatar"), users.updateAvatar)

module.exports = router
