// const Jimp = require("jimp")
// const path = require("path")
const fs = require("fs/promises")
require("dotenv").config()
const cloudinary = require("cloudinary").v2

const { AVA_UPLOAD_DIR, TEMP_DIR, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
  secure: true,
})

// const uploadDir = path.join(process.cwd(), AVA_UPLOAD_DIR)

// const avatarResizeRename = async (file) => {
//   try {
//     const img = await Jimp.read(file.path)
//     const imgHeight = 250
//     await img.resize(Jimp.AUTO, imgHeight).writeAsync(file.path)

//     const avatarPath = path.join(uploadDir, Date.now() + "_" + file.originalname)
//     await fs.rename(file.path, avatarPath)

//     return avatarPath
//   } catch (error) {
//     fs.unlink(TEMP_DIR)
//   }
// }

const uploadCloud = (filePath) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      filePath,
      {
        folder: "avatars",
        transformation: {
          height: 250,
          crop: "fill",
        },
      },
      (error, result) => {
        if (result) resolve(result)
        if (error) reject(error)
      }
    )
  })
}

const avatarDelete = (id) => {
  cloudinary.uploader.destroy(id, (error, result) => {
    console.log(error, result)
  })
}

const avatarResizeRename = async (file) => {
  try {
    const avatar = await uploadCloud(file.path)
    await fs.unlink(file.path)
    return avatar
  } catch (error) {
    fs.unlink(TEMP_DIR)
  }
}

module.exports = { avatarResizeRename, avatarDelete }
