var express = require("express");
const userController = require("../controllers/users");
var router = express.Router();
router.get("/", userController.getUsers);
router.get("/createtable", userController.createTable);
router.post("/", userController.createUser);
router.post("/checklogin", userController.login);

module.exports = router;
