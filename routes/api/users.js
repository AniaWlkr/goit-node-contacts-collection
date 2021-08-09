const express = require("express")
const router = express.Router()
const { users } = require("../../controllers")
const { checkToken, multerUpload } = require("../../middleware")

router.patch("/", checkToken, users.updateUserSubscription)
router.get("/verify/:verifyToken", users.verifyEmail)
router.get("/current", checkToken, users.getCurrentUser)
router.get("/:userId", checkToken, users.findUserById)
router.patch("/avatar", checkToken, multerUpload.single("avatar"), users.updateAvatar)

module.exports = router
