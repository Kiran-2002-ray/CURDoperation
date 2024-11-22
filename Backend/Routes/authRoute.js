const express = require("express");
const router = express.Router();
const { signup, login, getAllData } = require("../Controllers/authcontroller"); 


router.post("/signup", signup);
router.post("/login", login);
router.get("/getdata", getAllData);

module.exports = router;
