import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router";
import Login from "../component/Login/Login";
import { createTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import AdminDashBoard from "../PagesLayoutAdmin/AdminDashBoard";
import AdminMain from "../PagesLayoutAdmin/AdminMain";
import AdminProfileFoam from "../AdminFoam/AdminProfileFoam";
import AdminHrFoam from "../AdminFoam/AdminHrFoam";
import DesignationTable from "../PagesLayoutAdmin/DesignationTable";
import HrTable from "../PagesLayoutAdmin/HrTable";
import HrDashBoard from "../PagesLayoutHr/HrDashBoard";
import HrMain from "../PagesLayoutHr/HrMain";
import ApproveLeave from "../PagesLayoutHr/ApproveLeave";
import ApproveResignation from "../PagesLayoutHr/ApproveResignation";
import EmployeeProfileFoam from "../EmployeeFoam/EmployeeProfileFoam";
import EmployeeDashBoard from "../PageLayoutEmployee/EmployeeDashBoard";
import EmployeeMain from "../PageLayoutEmployee/EmployeeMain";
import HrManageEmployee from "../PagesLayoutHr/HrManageEmployee";
import HrProfileFoam from "../HrFoam/HrProfileFoam";
import EmployeeLeave from "../EmployeeFoam/EmployeeLeave";
import EmployeeResignation from "../EmployeeFoam/EmployeeResignation";

const theme = createTheme({
  palette: {
    background: {
      default: "#f4f5fd",
    },
  },
  shape: {
    borderRadius: "none",
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/Admin-DashBoard"
            element={<AdminDashBoard></AdminDashBoard>}
          >
            <Route
              path="/Admin-DashBoard"
              element={<AdminMain heading="HR Profile Information" />}
            />
            <Route
              path="Admin-Profile"
              element={<AdminProfileFoam heading="HR Profile Information" />}
            />
            <Route path="Admin-HR-Foam" element={<AdminHrFoam />} />
            <Route
              exact
              path="Admin-Designation-Table"
              element={<DesignationTable />}
            />
            <Route path="Admin-HR-Table" element={<HrTable />} />
          </Route>

          <Route
            exact
            path="/Hr-DashBoard"
            element={<HrDashBoard></HrDashBoard>}
          >
            <Route
              path="/Hr-DashBoard"
              element={<HrMain heading="HR Profile Information" />}
            />
            <Route
              path="HR-ApproveResignation-Foam"
              element={<ApproveResignation />}
            />
            <Route path="HR-ApproveLeave-Foam" element={<ApproveLeave />} />
            <Route
              path="HR-Profile"
              element={<HrProfileFoam heading="Hr Profile Information" />}
            />
            <Route
              path="HR-ManageEmployee-Foam"
              element={<HrManageEmployee />}
            />
          </Route>

          <Route
            exact
            path="/Employee-DashBoard"
            element={<EmployeeDashBoard />}
          >
            <Route
              path="/Employee-DashBoard"
              element={<EmployeeMain heading="HR Profile Information" />}
            />
            <Route
              path="Employee-Profile"
              element={
                <EmployeeProfileFoam heading="Employee Profile Information" />
              }
            />
            <Route path="Apply-Leave-Foam" element={<EmployeeLeave />} />
            <Route
              path="Apply-Resignation-Foam"
              element={<EmployeeResignation />}
            />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
