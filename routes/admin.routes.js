const router = require("express").Router();

const { getUsers } = require("../controllers/admin.controller");

const { verifyToken, checkRole } = require("../middleware");

//router.post("/", verifyToken, checkRole(["Admin"]), ); //ruta post pending to add. You can use it to modify the database as you want.
router.get("/getusers", verifyToken, checkRole(["Admin"]), getUsers); 

module.exports = router;
