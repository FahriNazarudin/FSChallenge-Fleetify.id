const express = require("express");
const DepartementControllers = require("./controllers/DepartmentControllers");
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


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

