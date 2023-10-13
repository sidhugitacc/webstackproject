const path = require("path");
const db = require("../config/database");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

const nodemailer = require("nodemailer");
const req = require("express/lib/request");
// exports.getHrFrontPage = (req, res) => {
//   res.status(200).send(`welcome hr ${req.query.hrUserName}`);
// };

exports.getHrData = (req, res) => {
  console.log("adskl5432")
  // db.connect((err) => {
  //   if (err) {
  //     // throw err;
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  // ---------------------------------
  db.query(
    "SELECT HR_ID, FIRST_NAME, LAST_NAME, PASSWORD, EMAIL, PHONE_NUMBER, DOB, HIRE_DATE, ADDRESS, CNIC FROM hr WHERE HR_ID = ?",
    [req.id],
    (err, result) => {
      console.log("Result:", result);
      if (err) {
        return res.status(400).json({ status: "failed", error: err });
      }
      res.status(200).json({ status: "success", result });
    }
  );
  // db.end;
};
exports.addEmployee = (req, res) => {
  const {
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PHONE_NUMBER,
    DOB,
    HIRE_DATE,
    ADDRESS,
    CNIC,
    DESIGNATION_ID,
  } = req.body;
  console.log("ajdfddddd",req.body)
  let EMP_ID;
  const password = crypto.randomBytes(20).toString("hex");
  // db.connect((err) => {
  //   if (err) {
  //     return res.status(500).send("internal error occured...");
  //   }
  // });
  db.query("select EMP_ID from employee ORDER BY EMP_ID DESC", (err, row) => {
    if (err) {
      return res.status(500).json({ message: "internal error occured..." });
    }

    if (row.length === 0) {
      EMP_ID = "e0";
    } else {
      EMP_ID = `e${
        parseInt(row[0].EMP_ID.substring(1, row[0].EMP_ID.length)) + 1
      }`;
    }

    console.log("asdhhhhhhhhh",row)

    // bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS)).then((hash) => {
      // console.log(process.env.SALT_ROUNDS);
      db.query(
        "INSERT INTO employee (EMP_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, DOB, HIRE_DATE, ADDRESS, CNIC, HR_ID, DESIGNATION_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [EMP_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER, DOB, HIRE_DATE, ADDRESS, CNIC, req.id, DESIGNATION_ID],
        (err, result) => {
          if (err) {
            return res.status(400).json({ status: "failed", error: err });
          }
  
          res.status(200).json({ status: "success", data: EMP_ID });
        }
      );
    });

  // db.end;
};
exports.getEmployee = (req, res) => {
  db.query(
    "select EMP_ID,FIRST_NAME,LAST_NAME, EMAIL,PHONE_NUMBER,date_format(DOB, '%Y-%m-%d' ) as 'DOB',date_format(HIRE_DATE, '%Y-%m-%d' ) as 'HIRE_DATE',ADDRESS,CNIC,DESIGNATION_ID from employee where HR_ID='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }

      res.status(200).json({ status: "success", result });
    }
  );
};
exports.delEmployee = (req, res) => {
  db.query(
    "delete from employee where EMP_ID='" +
      req.body.EMP_ID +
      "' AND HR_ID='" +
      req.id +
      "'",
    (err, result) => {
      if (err) {
        return res.status(404).json({ status: "failer" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.updateEmployee = (req, res) => {
  const {
    EMP_ID,
    FIRST_NAME,
    LAST_NAME,
    EMAIL,
    PHONE_NUMBER,
    DOB,
    HIRE_DATE,
    ADDRESS,
    CNIC,
    DEPARTMENT_ID,
    DESIGNATION_ID,
  } = req.body;

  db.query(
    "update employee set FIRST_NAME='" +
      FIRST_NAME +
      "',LAST_NAME='" +
      LAST_NAME +
      "',EMAIL='" +
      EMAIL +
      "',PHONE_NUMBER=" +
      PHONE_NUMBER +
      ",DOB='" +
      DOB +
      "',HIRE_DATE='" +
      HIRE_DATE +
      "',ADDRESS='" +
      ADDRESS +
      "',CNIC=" +
      CNIC +
      ",DEPARTMENT_ID='" +
      DEPARTMENT_ID +
      "',DESIGNATION_ID='" +
      DESIGNATION_ID +
      "' WHERE EMP_ID='" +
      EMP_ID +
      "' AND HR_ID='" +
      req.id +
      "' ",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};

exports.getLeave = (req, res) => {
  db.query(
    "select date_format(L.START_DATE, '%Y-%m-%d' ) as 'START_DATE',date_format(L.END_DATE, '%Y-%m-%d' ) as 'END_DATE',L.REASON,L.LEAVE_STATUS,L.EMP_ID from leave_request L,employee E where L.EMP_ID=E.EMP_ID and E.HR_ID='" +
      req.id +
      "' ",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.updateLeave = (req, res) => {
  // if (req.body.LEAVE_STATUS === "approved") {
  //   let END_DATE = new Date(req.body.END_DATE);
  //   let START_DATE = new Date(req.body.START_DATE);
  //   console.log(END_DATE, START_DATE, typeof END_DATE);
  //   let nDays =
  //     Date.UTC(
  //       END_DATE.getFullYear(),
  //       END_DATE.getMonth(),
  //       END_DATE.getDate()
  //     ) -
  //     Date.UTC(
  //       START_DATE.getFullYear(),
  //       START_DATE.getMonth(),
  //       START_DATE.getDate()
  //     );
  //   //    /
  //   // 86400000;
  //   console.log(
  //     nDays)
  //   );
  // }
  db.query(
    "update leave_request set LEAVE_STATUS='" +
      req.body.LEAVE_STATUS +
      "' where EMP_ID='" +
      req.body.EMP_ID +
      "' and START_DATE='" +
      req.body.START_DATE +
      "'and HR_ID='" +
      req.id +
      "'and LEAVE_STATUS='under review'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.getResignation = (req, res) => {
  db.query(
    "select R.EMP_ID,R.REASON,date_format(R.APPLY_DATE, '%Y-%m-%d' ) as 'APPLY_DATE',R.APPROVED_STATUS from resignation R,employee E where R.EMP_ID=E.EMP_ID and E.HR_ID='" +
      req.id +
      "' ",
    // and R.APPROVED_STATUS='under review'
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed" });
      }
      // console.log(result);
      res.status(200).json({ status: "success", result });
    }
  );
};
exports.updateResignation = (req, res) => {
  db.query(
    "update resignation set APPROVED_STATUS='" +
      req.body.APPROVED_STATUS +
      "' where EMP_ID='" +
      req.body.EMP_ID +
      "' and APPLY_DATE='" +
      req.body.APPLY_DATE +
      "'and HR_ID='" +
      req.id +
      "' and APPROVED_STATUS='under review'",
    (err, result) => {
      if (err) {
        return res.status(400).json({ status: "failed", err });
      }
      res.status(200).json({ status: "success", result });
    }
  );
};