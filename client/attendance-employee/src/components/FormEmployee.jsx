import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import http from "../lib/http";

export default function FormEmployee(props) {
  const { id, type, employees } = props;
  const [name, setName] = useState("");
  const [employee_id, setEmployee_id] = useState("");
  const [department_id, setDepartment_id] = useState("");
  const [address, setAddress] = useState("");
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch departments for dropdown
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await http({
          method: "GET",
          url: "/departments",
        });
        setDepartments(response.data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    fetchDepartments();
  }, []);

  // Pre-fill form for edit mode
  useEffect(() => {
    if (type === "edit" && employees) {
      setName(employees.name || "");
      setEmployee_id(employees.employee_id || "");
      setDepartment_id(employees.department_id || "");
      setAddress(employees.address || "");
    }
  }, [type, employees]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        name: name,
        employee_id: employee_id,
        department_id: parseInt(department_id),
        address: address,
      };

      const response = await http({
        method: type === "add" ? "POST" : "PUT",
        url: type === "add" ? "/employees" : `/employees/${id}`,
        data: requestData,
      });

      console.log(response.data);

      // Reset form only for add operation
      if (type === "add") {
        setName("");
        setEmployee_id("");
        setDepartment_id("");
        setAddress("");
      }

      // Show success message
      alert(
        type === "add"
          ? "Employee created successfully!"
          : "Employee updated successfully!"
      );

      navigate("/employees");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "Error submitting form: " +
          (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-warning text-white">
              <h5 className="card-title mb-0">
                {type === "add" ? "Create New Employee" : "Edit Employee"}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                {/* Employee ID Field */}
                <div className="mb-3">
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeId"
                    value={employee_id}
                    onChange={(e) => setEmployee_id(e.target.value)}
                    placeholder="Masukkan Employee ID (contoh: EMP001)"
                    required
                  />
                  <div className="form-text">
                    Employee ID harus unik dan tidak boleh sama dengan yang lain
                  </div>
                </div>

                {/* Employee Name Field */}
                <div className="mb-3">
                  <label htmlFor="employeeName" className="form-label">
                    Nama Karyawan <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="employeeName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama lengkap karyawan"
                    required
                  />
                </div>

                {/* Department Dropdown */}
                <div className="mb-3">
                  <label htmlFor="department" className="form-label">
                    Department <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="department"
                    value={department_id}
                    onChange={(e) => setDepartment_id(e.target.value)}
                    required
                  >
                    <option value="">Pilih Department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.department_name}
                      </option>
                    ))}
                  </select>
                  <div className="form-text">
                    Pilih department tempat karyawan bekerja
                  </div>
                </div>

                {/* Address Field */}
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Alamat <span className="text-danger">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="address"
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Masukkan alamat lengkap karyawan"
                    required
                  ></textarea>
                  <div className="form-text">
                    Alamat rumah atau tempat tinggal karyawan
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning"
                    style={{ color: "white" }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        {type === "add" ? "Creating..." : "Updating..."}
                      </>
                    ) : type === "add" ? (
                      "Create Employee"
                    ) : (
                      "Update Employee"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => navigate("/employees")}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
