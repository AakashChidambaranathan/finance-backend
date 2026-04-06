const express = require("express");
const router = express.Router();
const authorize = require("../middleware/auth");

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

router.post("/", authorize(["admin"]), createRecord);
router.put("/:id", authorize(["admin"]), updateRecord);
router.delete("/:id", authorize(["admin"]), deleteRecord);

// Admin and Analyst: view records
router.get("/", authorize(["admin", "analyst"]), getRecords);

module.exports = router;
