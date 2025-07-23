import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import Employees from "./pages/Employees";
import Department from "./pages/Department";
import CreateDepartment from "./pages/CreateDepartment";
import EditDepartment from "./pages/EditDepartment";
import Attendance from "./pages/Attendance";
import AttendaceHistories from "./pages/AttendanceHistory";
import CreateEmployee from "./pages/CreateEmployee";
import EditEmployee from "./pages/EditEmployee";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/create-employee" element={<CreateEmployee />} />
        <Route path="/edit-employee/:id" element={<EditEmployee />} />
        <Route path="/departments" element={<Department />} />
        <Route path="/create-departments" element={<CreateDepartment />} />
        <Route path="/edit-departments/:id" element={<EditDepartment />} />
        <Route path="/attendances" element={<Attendance />} />
        <Route path="/attendance-histories" element={<AttendaceHistories />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
