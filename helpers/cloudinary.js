const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

//setup cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => {
    return {
      folder: "pictureUpload",
      allowedFormats: ["png", "jpg", "jpeg", "webp"],
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(svg | gif | docx)$/)) {
          return cb(new Error("Invalid file"))
        }
        cb(null, file.originalname);
      },
      public_id:`app-${file.originalname}`
    };
  },
});

const uploadCloud = multer ({storage})

module.exports = uploadCloud;
