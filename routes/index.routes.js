const router = require("express").Router();
const authRoutes = require("./auth.routes");




router.get('/',(req, res) => {
  res.status(200).json("all good here")
})


router.use("/auth", authRoutes);


module.exports = router;
