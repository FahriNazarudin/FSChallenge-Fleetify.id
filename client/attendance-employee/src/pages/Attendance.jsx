import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import http from "../lib/http";

export default function Attendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [attendanceType, setAttendanceType] = useState("clock-in");
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);


  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await http({
        method: "GET",
        url: "/employees",
      });
      setEmployees(response.data);
      console.log("Fetched employees:", response.data);
      
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const fetchDepartments = async () => {
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
  };

  const getDepartmentName = (departmentId) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.department_name : "Unknown Department";
  };
  
  const handleEmployeeIdChange = (e) => {
    const id = e.target.value;
    setEmployeeId(id);


    const employee = employees.find((emp) => emp.employee_id === id);
    setSelectedEmployee(employee);
  };

  const handleAttendance = async (e) => {
    e.preventDefault();

    if (!employeeId) {
      alert("Please enter Employee ID");
      return;
    }

    if (!selectedEmployee) {
      alert("Employee not found");
      return;
    }

    setLoading(true);

    try {
      let response;

      if (attendanceType === "clock-in") {
        response = await http({
          method: "POST",
          url: "/attendances",
          data: { employee_id: employeeId },
        });
        alert("Clock in successful!");
      } else {
        response = await http({
          method: "PUT",
          url: "/attendances/clock-out",
          data: { employee_id: employeeId },
        });
        alert("Clock out successful!");
      }

      console.log(response.data);

      setEmployeeId("");
      setSelectedEmployee(null);
      setAttendanceType("clock-in");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow">
              <div className="card-header bg-warning text-white">
                <h5 className="card-title mb-0">
                  <i className="fas fa-user-check me-2"></i>
                  Mark Attendance
                </h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAttendance}>
                  <div className="mb-4">
                    <label htmlFor="employeeId" className="form-label fw-bold">
                      Employee ID <span className="text-danger">*</span>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="fas fa-id-badge"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="employeeId"
                        value={employeeId}
                        onChange={handleEmployeeIdChange}
                        placeholder="Enter Employee Id"
                        required
                      />
                    </div>
                    <div className="form-text">
                      Enter your unique employee identification number
                    </div>
                  </div>

                  {selectedEmployee && (
                    <div className="mb-4">
                      <div className="alert alert-success" role="alert">
                        <h6 className="alert-heading">
                          <i className="fas fa-check-circle me-2"></i>
                          Employee Found
                        </h6>
                        <p className="mb-1">
                          <strong>Name:</strong> {selectedEmployee.name}
                        </p>
                        <p className="mb-0">
                          <strong>Department:</strong>{" "}
                          {getDepartmentName(selectedEmployee.department_id)}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="form-label fw-bold">
                      Attendance Type <span className="text-danger">*</span>
                    </label>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="attendanceType"
                            id="clockIn"
                            value="clock-in"
                            checked={attendanceType === "clock-in"}
                            onChange={(e) => setAttendanceType(e.target.value)}
                          />
                          <label className="form-check-label" htmlFor="clockIn">
                            <i className="fas fa-sign-in-alt text-success me-2"></i>
                            <strong>Clock In</strong>
                            <div className="text-muted small">
                              Mark your arrival time
                            </div>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="attendanceType"
                            id="clockOut"
                            value="clock-out"
                            checked={attendanceType === "clock-out"}
                            onChange={(e) => setAttendanceType(e.target.value)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="clockOut"
                          >
                            <i className="fas fa-sign-out-alt text-danger me-2"></i>
                            <strong>Clock Out</strong>
                            <div className="text-muted small">
                              Mark your departure time
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="d-grid">
                    <button
                      type="submit"
                      className={`btn btn-lg ${
                        attendanceType === "clock-in"
                          ? "btn-success"
                          : "btn-danger"
                      }`}
                      disabled={loading || !selectedEmployee}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <i
                            className={`fas ${
                              attendanceType === "clock-in"
                                ? "fa-sign-in-alt"
                                : "fa-sign-out-alt"
                            } me-2`}
                          ></i>
                          {attendanceType === "clock-in"
                            ? "Clock In Now"
                            : "Clock Out Now"}
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
