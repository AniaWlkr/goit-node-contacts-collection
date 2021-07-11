const mongoose = require("mongoose")
const { rule } = require("../utils/validate/schemas/contacts")
require("dotenv").config()

const DB_PATH = process.env.DB_CONNECTION_URL

console.log(DB_PATH)

const db = mongoose.connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true })

module.exports = db
