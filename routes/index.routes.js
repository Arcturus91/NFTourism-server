const router = require("express").Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const adminRoutes = require("./admin.routes");




router.get('/',(req, res) => {
  res.status(200).json("all good here")
})


router.use("/auth", authRoutes);

router.use("/user", userRoutes);
router.use("/admin", adminRoutes );

module.exports = router;
