const express = require("express");
const router = express.Router();
// --------------------------------

const {
  getHr,
  delHr,
  updateHr,
  addHr,
  getAdminData,
  getDesignation,
  postDesignation,
  delDesignation,
  updateDesignation,
} = require("../controller/adminController");

router.route("/addhr").get(getHr).post(addHr).delete(delHr).put(updateHr);
router.route("/getadmindata").get(getAdminData);
router
  .route("/managedesignation")
  .get(getDesignation)
  .post(postDesignation)
  .delete(delDesignation)
  .put(updateDesignation);
module.exports = router;
