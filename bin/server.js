const mongoose = require("mongoose")
const app = require("../app")
require("dotenv").config()
const createFolderIfNotExists = require("../utils/folderCheckCreate")

const PORT = process.env.PORT || 3000
const DB_PATH = process.env.DB_CONNECTION_URL
const { AVA_UPLOAD_DIR, TEMP_DIR } = process.env

const db = mongoose
  .connect(DB_PATH, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    console.log("Database connection successful")
    app.listen(PORT, async () => {
      await createFolderIfNotExists(AVA_UPLOAD_DIR)
      await createFolderIfNotExists(TEMP_DIR)
      console.log(`Server running. Use our API on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

module.exports = db
