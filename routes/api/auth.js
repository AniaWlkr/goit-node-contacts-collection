const express = require("express")
const router = express.Router()
const { auth } = require("../../controllers")
const { checkToken, rateLimit } = require("../../middleware")

router.post("/signup", rateLimit.accountLimiter, auth.register)
router.post("/login", auth.login)
router.post("/logout", checkToken, auth.logout)

module.exports = router
