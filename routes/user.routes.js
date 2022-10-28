const router = require("express").Router();

const {uploadProcess,addReceipt} = require ("../controllers/upload.controller");
const uploadCloud = require ("../helpers/cloudinary")

const {getLoggedUser,
  
} = require ("../controllers/user.controller");

const {verifyToken,checkWallet,checkRole,checkBankAccount} = require ("../middleware")

router.get("/my-profile", verifyToken, getLoggedUser)


router.post("/my-profile/singleUpload",uploadCloud.single("image"),uploadProcess)

router.post("/my-profile/uploadReceipt", verifyToken,addReceipt)




module.exports = router;