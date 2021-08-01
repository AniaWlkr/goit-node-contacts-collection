const express = require("express")
const logger = require("morgan")
const cors = require("cors")
const helmet = require("helmet")
const path = require("path")
const { rateLimit } = require("./middleware")
const { clientMaxBodySize } = require("./config/rateLimit.json")

const api = require("./routes/api")

const app = express()

const formatsLogger = app.get("env") === "development" ? "dev" : "short"

app.use(logger(formatsLogger))
app.use(cors())
app.use(helmet())
app.use(express.json({ limit: clientMaxBodySize }))
app.use(rateLimit.limiter)

app.use("/api/contacts", api.contacts)
app.use("/api/auth", api.auth)
app.use("/api/users", api.users)

app.use(express.static(path.join(__dirname, "public")))

app.use((req, res) => {
  res.status(404).json({ message: "Not found" })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

module.exports = app
