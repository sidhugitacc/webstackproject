const express = require("express");
const router = express.Router();
// --------------------------------
const {
  getHrData,
  addEmployee,
  getEmployee,
  delEmployee,
  updateEmployee,
  getLeave,
  updateLeave,
  getResignation,
  updateResignation,
} = require("../controller/hrController");
// -------------------------------
router.route("/gethrdata").get(getHrData);
router
  .route("/manageemployee")
  .get(getEmployee)
  .post(addEmployee)
  .delete(delEmployee)
  .put(updateEmployee);
router.route("/manageleave").get(getLeave).put(updateLeave);
router.route("/manageresignation").get(getResignation).put(updateResignation);
// --------------------------------
module.exports = router;
