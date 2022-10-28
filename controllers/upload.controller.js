const cloudinary = require("cloudinary");
const User = require("../models/User.model");

exports.uploadProcess = async (req, res, next) => {
  const uploads = (file, folder) => {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(file, (result) => {
        resolve(
          {
            url: result.url,
            id: result.public_id,
          },
          {
            resource_type: "auto",
            folder,
          }
        );
      }); //end cloudinary
    }); //end new promise
  }; //end upload

  const uploader = async (path) => uploads(path, "images");

  if (req.method === "POST") {
    const { path } = req.file;
    const newPath = await uploader(path);
    const url = {
      uri: newPath.url,
      id: newPath.id,
      name: req.file.originalname,
    }
      res.status(200).json({ url, successMessage: "Picture uploaded" });
  } else {
    res.status(400).json({ errorMessage: `${req.method} not allowed!` }); //req.method indica el metodo html.
  }
};


exports.addReceipt = (req, res, next) => {
  const { receiptUrl } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id,{
    $push: { receipts: receiptUrl},
  },
  { new: true })
  .then((user)=>{ 
  res.status(200).json({ user, successMessage: "Picture uploaded" })
})

}

