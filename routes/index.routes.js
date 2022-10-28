const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");




router.get('/',(req, res) => {
  res.status(200).json("all good here")
})


router.use("/auth", authRoutes);

router.use("/user", userRoutes);

module.exports = router;
