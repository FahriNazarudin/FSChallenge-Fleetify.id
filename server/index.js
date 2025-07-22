const express = require("express");
const DepartementControllers = require("./controllers/DepartmentControllers");
const EmployeeControllers = require("./controllers/EmployeeControllers");
const AttendanceControllers = require("./controllers/AttendanceControllers");
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Department API
app.get("/departments", DepartementControllers.getAllDepartments);
app.get("/departments/:id", DepartementControllers.getDepartmentById);
app.post("/departments", DepartementControllers.createDepartment);
app.put("/departments/:id", DepartementControllers.updateDepartment);
app.delete("/departments/:id", DepartementControllers.deleteDepartment);

// Employee API
app.get("/employees", EmployeeControllers.getAllEmployees);
app.get("/employees/:id", EmployeeControllers.getEmployeeById);
app.post("/employees", EmployeeControllers.createEmployee);
app.put("/employees/:id", EmployeeControllers.updateEmployee);
app.delete("/employees/:id", EmployeeControllers.deleteEmployee);


// Attendance API
app.get("/attendances", AttendanceControllers.getAttendance);
app.post("/attendances", AttendanceControllers.createAttendance);
app.put("/attendances/clock-out", AttendanceControllers.updateAttendance);

// Attendance History API
app.get("/attendance-history", AttendanceControllers.getAttendanceHistory);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

