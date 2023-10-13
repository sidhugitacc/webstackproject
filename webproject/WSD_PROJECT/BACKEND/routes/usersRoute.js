const express = require("express");
const router = express.Router();
// ------------------------------

const { verifyCredentials } = require("../controller/usersController");
console.log("111111111111111")
// -----------------------------
router.route("/userLogin").post(verifyCredentials);

module.exports = router;
