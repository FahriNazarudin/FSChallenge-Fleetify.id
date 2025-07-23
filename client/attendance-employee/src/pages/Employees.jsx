import { useNavigate } from "react-router";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import http from "../lib/http";
import Swal from "sweetalert2";
import Button from "../components/Button";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments]   = useState([]);
  const navigate = useNavigate();

  async function fetchEmployees() {
    try {
      const respoense = await http({
        method: "GET",
        url: "/employees",
      });
      console.log(respoense.data);
      setEmployees(respoense.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }

  async function fetchDepartments() {
    try {
      const response = await http({
        method: "GET",
        url: "/departments",
      });
      setDepartments(response.data);
      console.log("Fetched departments:", response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }

  async function handleDelete(id) {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#d8d8d8",
        confirmButtonText: "Yes, delete it!",
      });

      if (!result.isConfirmed) {
        await http({
          method: "DELETE",
          url: `/employees/${id}`,
        });
      }
      Swal.fire("Deleted!", "Department has been deleted", "success");

      fetchEmployees();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete",
      });
    }
  }

  useEffect(() => {
    fetchEmployees();
    fetchDepartments()
  }, []);


  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.department_name : "Unknown Department";
  };    
  return (
    <div>
      <Navbar />
      <div className="container mt-4 d-flex justify-content-end mx-3">
        <Button
          type="add"
          variant="warning"
          title="Create Employee"
          onClick={() => navigate("/create-employee")}
        />
      </div>
      <div className="container mt-4 p-4 rounded-4">
        <table className="table rounded-3 shadow">
          <thead className="table-warning">
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">Name Employee</th>
              <th scope="col">Department</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {employees.map((employee, i) => (
            <tbody key={employee.id}>
              <tr className="text-center">
                <th scope="row">{i + 1}</th>
                <td>{employee.name}</td>
                <td>{getDepartmentName(employee.department_id)}</td>
                <td>{employee.address}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      style={{ color: "white" }}
                      title="edit"
                      variant="warning"
                      type="button"
                      onClick={() => navigate(`/edit-employee/${employee.id}`)}
                    />
                    <Button
                      title="delete"
                      variant="danger"
                      type="button"
                      onClick={() => handleDelete(employee.id)}
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
}
