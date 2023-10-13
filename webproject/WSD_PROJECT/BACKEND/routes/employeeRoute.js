const express = require("express");
const router = express.Router();
// --------------------------------
const {
  getEmployeeData,
  getRequestLeave,
  postrequestleave,
  getResignationRequest,
  delLeaveRequest,
  postResignationRequest,
  delResignationRequest,
} = require("../controller/employeeController");
// -------------------------------
router.route("/getemployeedata").get(getEmployeeData);
router
  .route("/requestleave")
  .get(getRequestLeave)
  .post(postrequestleave)
  .delete(delLeaveRequest)
router
  .route("/requestresignation")
  .get(getResignationRequest)
  .post(postResignationRequest)
  .delete(delResignationRequest)
// -------------------------------

module.exports = router;
