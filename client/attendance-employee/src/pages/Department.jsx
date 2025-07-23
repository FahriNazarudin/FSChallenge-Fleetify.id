import { useEffect, useState } from "react";
import http from "../lib/http";
import Button from "../components/Button";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

export default function Department() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  async function fetchDepartments() {
    try {
      const respoense = await http({
        method: "GET",
        url: "/departments",
      });
      console.log(respoense.data);
      setDepartments(respoense.data);
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
          url: `/departments/${id}`,
        });
      }
      Swal.fire("Deleted!", "Department has been deleted", "success");

      fetchDepartments();
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
    fetchDepartments();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="container mt-4 d-flex justify-content-end mx-3">
        <Button
          type="add"
          variant="warning"
          title="Create Department"
          onClick={() => navigate("/create-departments")}
        />
      </div>
      <div className="container mt-4 p-4 rounded-3">
        <table className="table rounded-3 shadow">
          <thead className="table-warning color-white">
            <tr className="text-center">
              <th scope="col">No</th>
              <th scope="col">Name Department</th>
              <th scope="col">Clock In</th>
              <th scope="col">Clock Out</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          {departments.map((department, i) => (
            <tbody key={department.id}>
              <tr className="text-center">
                <th scope="row">{i + 1}</th>
                <td>{department.department_name}</td>
                <td>{department.max_clock_in_time}</td>
                <td>{department.max_clock_out_time}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      title="edit"
                      variant="warning"
                      type="button"
                      onClick={() =>
                        navigate(`/edit-departments/${department.id}`)
                      }
                    />
                    <Button
                      title="delete"
                      variant="danger"
                      type="button"
                      onClick={() => handleDelete(department.id)}
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
