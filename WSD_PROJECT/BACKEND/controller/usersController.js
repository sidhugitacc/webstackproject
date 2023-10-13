const db = require("../config/database");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/JWT");
// exports.getLoginPage = (req, res) => {
//   // console.log(path.resolve(__dirname));
//   res
//     .status(200)
//     .sendFile(
//       path.join(__dirname.replace("controller", ""), "build", "index.html")
//     );
// };

exports.verifyCredentials = (req, res) => {
  // get the data from the login form
  console.log("aaaaaaaaaaaaaaaaaaaaa")

  const { id, password, loginAs } = req.body;

  // write a query depending on which user is logging in
  let query = "";
  console.log("abinnn")
  if (loginAs === "Admin") {
    query = "SELECT * FROM sys_admin WHERE NAME=? AND password=?";
    console.log(query, "heiueiiu")
  } else if (loginAs === "Employee") {
    query =
      "SELECT * FROM employee WHERE EMP_ID=? AND EMP_ID NOT IN(SELECT EMP_ID FROM RESIGNATION WHERE EMP_ID=? and APPROVED_STATUS='approved')";
  } else if (loginAs === "Hr") {
    query = "SELECT * FROM hr WHERE hr_id=? AND password=?";
  }
  // ---------------------------------------------------

  // run a db query to fetch user data
  db.query(query, [id, password], (err, row, fields) => {
    console.log("sjdalkj", id, password)
    if (err) {
      console.log(err); 
    }
    console.log("---", row);
    if (row.length === 1) {
      // if you want to compare passwords without bcrypt, you can do it directly
      if (row[0].password === password) {
        console.log("adsjf;lak")
        const accessToken = createToken(id, loginAs);
              console.log("akljkjf")
        res.cookie("accessToken", accessToken, {
          maxAge: 1800000, // 30 min
          httpOnly: true,
        });

        res
          .status(200)
          .json({ status: "success", message: "successfully logged in" });
      } else {
        res.status(401).json({
          status: "failure",
          message: "wrong username or password",
        });
      }
    } else {
      res
        .status(401)
        .json({ status: "failed", message: "Invalid credentials. Try again" });
    }
  });
};

