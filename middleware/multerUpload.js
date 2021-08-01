const multer = require("multer")
const path = require("path")
const sizeLimits = require("../config/multerSizeLimits.json")
require("dotenv").config()

const { TEMP_DIR } = process.env
const tempDir = path.join(process.cwd(), TEMP_DIR)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
  limits: sizeLimits,
  fileFilter: function (req, file, cb) {
    if (file.mimetype.includes("image")) {
      cb(null, true)
      return
    }
    cb(null, false)
  },
})

const multerUpload = multer({ storage })

module.exports = multerUpload
