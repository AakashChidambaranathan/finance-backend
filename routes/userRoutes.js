const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");
const { createUser, getUsers } = require("../controllers/userController");

router.post("/", authorize(["admin"]), createUser);
router.get("/", authorize(["admin"]), getUsers);

module.exports = router;
