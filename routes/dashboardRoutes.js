const express = require("express");
const router = express.Router();

const { getTotalIncome } = require("../controllers/dashboardController");
const authorize = require("../middleware/auth");

router.get(
  "/income",
  authorize(["admin", "analyst", "viewer"]),
  getTotalIncome,
);
router.post(
  "/income",
  authorize(["admin", "analyst", "viewer"]),
  getTotalIncome,
);

module.exports = router;
