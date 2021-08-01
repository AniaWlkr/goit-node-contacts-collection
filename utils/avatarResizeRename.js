const Jimp = require("jimp")
const path = require("path")
const fs = require("fs/promises")
require("dotenv").config()

const { AVA_UPLOAD_DIR, TEMP_DIR } = process.env
const uploadDir = path.join(process.cwd(), AVA_UPLOAD_DIR)

const avatarResizeRename = async (file) => {
  try {
    const img = await Jimp.read(file.path)
    const imgHeight = 250
    await img.resize(Jimp.AUTO, imgHeight).writeAsync(file.path)

    const avatarPath = path.join(uploadDir, Date.now() + "_" + file.originalname)
    await fs.rename(file.path, avatarPath)

    return avatarPath
  } catch (error) {
    fs.unlink(TEMP_DIR)
  }
}

module.exports = avatarResizeRename
