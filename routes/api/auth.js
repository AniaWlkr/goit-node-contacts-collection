const express = require("express")
const router = express.Router()
const { auth } = require("../../controllers")
const { checkToken, rateLimit, multerUpload } = require("../../middleware")

router.post("/signup", rateLimit.accountLimiter, multerUpload.single("avatar"), auth.register)
router.post("/login", auth.login)
router.post("/logout", checkToken, auth.logout)

module.exports = router
