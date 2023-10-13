import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import axios from "axios";

const initialData = {
  FirstName: "",
  LastName: "",
  Gmail: "",
  PhoneNumber: "",
  DOB: "",
  Gender: "male",
  HireDate: new Date(),
};

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#fdfdff",
    padding: theme.spacing(3),
    marginTop: theme.spacing(8),
  },
  content: { padding: theme.spacing(4), margin: theme.spacing(3) },
}));

export default function AdminHrFoam() {
  const classes = useStyles();
  const [data, setData] = useState(initialData);

  const onHandleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a backend endpoint for posting data
      await axios.post("http://localhost:5000/admin/addHr", data);
      console.log("jf;lkjf111111")

      // If successful, you may want to reset the form or handle success in some way
      setData(initialData);
      console.log("Data submitted successfully!");
    } catch (error) {
      // Handle error, you might want to display an error message
      console.error("Error submitting data:", error);
    }
  };

  return (
    <Paper elevation={0} square className={classes.root} align="center">
      <form className={classes.content} autoComplete="off" onSubmit={handleSubmit}>
        <Typography variant="h6" component="div" align="center">
          Add HR Information
        </Typography>
        <table>
        <tr>
            <td>First Name : </td>
            <td>
              <input type="text" placeholder="First Name" required></input>
            </td>
          </tr>
          <tr>
            <td>Last Name : </td>
            <td>
              <input type="text" placeholder="Last Name" required></input>
            </td>
          </tr>
          <tr>
            <td>CNIC : </td>
            <td>
              <input
                type="number"
                placeholder="****-*******-*"
                required
                maxLength="13"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Gender : </td>
            <td>
              <input type="radio" name="Gender" required />
              Male
              <input type="radio" name="Gender" required />
              Female
            </td>
          </tr>
          <tr>
            <td>Gmail : </td>
            <td>
              <input type="gmail" placeholder="name@gmail.com" required></input>
            </td>
          </tr>
          <tr>
            <td>Phone Number : </td>
            <td>
              <input
                type="number"
                placeholder="33******"
                required
                maxLength="11"
              ></input>
            </td>
          </tr>
          <tr>
            <td>Password : </td>
            <td>
              <input type="password" placeholder="******" readonly></input>
            </td>
          </tr>
          <tr>
            <td>Date Of Birth : </td>
            <td>
              <input type="date"></input>
            </td>
          </tr>
          <tr>
            <td>Hire Date : </td>
            <td>
              <input type="date"></input>
            </td>
          </tr>
          <tr>
            <td>Address : </td>
            <td>
              <textarea rows="4" cols="20" placeholder="Address"></textarea>
            </td>
          </tr>
          <tr>
            <td>
              <input type="reset" value="Reset" className="btnAlert"></input>
            </td>
            <td>
              <input
                type="submit"
                value="Submit"
                className="btnSuccess"
              ></input>
            </td>
          </tr>
        </table>
        <div>
          <input type="reset" value="Reset" className="btnAlert" />
          <input type="submit" value="Submit" className="btnSuccess" />
        </div>
      </form>
    </Paper>
  );
}


