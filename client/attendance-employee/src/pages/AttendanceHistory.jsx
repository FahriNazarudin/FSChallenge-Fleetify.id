import Navbar from "../components/Navbar";
import { useEffect, useState, useCallback } from "react";
import http from "../lib/http";
import Swal from "sweetalert2";
import Button from "../components/Button";

export default function AttendaceHistories() {
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    date: "",
    start_date: "",
    end_date: "",
    department_id: "",
    employee_id: "",
  });

  const fetchAttendanceHistory = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      // Menambahkan filter ke parameter URL
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      // Jika ada start_date dan end_date, gunakan keduanya sebagai range
      // Jika hanya ada date, gunakan date tersebut
      if (filters.start_date && filters.end_date) {
        // Hapus parameter date jika ada range date
        params.delete("date");
        params.set("start_date", filters.start_date);
        params.set("end_date", filters.end_date);
      }

      const response = await http({
        method: "GET",
        url: `/attendance-history?${params}`,
      });
      console.log("Attendance History:", response.data);

      // Handle API response structure
      if (response.data && response.data.data) {
        setAttendanceHistory(response.data.data.attendance_history || []);
      } else {
        setAttendanceHistory([]);
      }
    } catch (error) {
      console.error("Error fetching attendance history:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch attendance history",
      });
    } finally {
      setLoading(false);
    }
  }, [filters]);

  async function fetchEmployees() {
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

  // Effect untuk fetch data pertama kali saat component mount
  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchAttendanceHistory();
  }, [fetchAttendanceHistory]);

  // Effect untuk fetch ulang data ketika filter berubah
  useEffect(() => {
    fetchAttendanceHistory();
  }, [filters, fetchAttendanceHistory]);

  // Function untuk mengubah nilai filter
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Function untuk mengosongkan semua filter
  const clearFilters = () => {
    setFilters({
      date: "",
      start_date: "",
      end_date: "",
      department_id: "",
      employee_id: "",
    });
  };

  // Function untuk format tanggal dan waktu
  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("id-ID", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <div className="card shadow">
          <div className="card-header bg-warning text-white">
            <h5 className="mb-0">Filters</h5>
          </div>
          <div className="card-body">
            <div className="row g-3">
              {/* Filter Tanggal Spesifik */}
              <div className="col-md-3">
                <label className="form-label">Specific Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.date}
                  onChange={(e) => handleFilterChange("date", e.target.value)}
                />
              </div>

              {/* Date Range */}
              <div className="col-md-3">
                <label className="form-label">Start Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.start_date}
                  onChange={(e) =>
                    handleFilterChange("start_date", e.target.value)
                  }
                  disabled={!!filters.date}
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">End Date:</label>
                <input
                  type="date"
                  className="form-control"
                  value={filters.end_date}
                  onChange={(e) =>
                    handleFilterChange("end_date", e.target.value)
                  }
                  disabled={!!filters.date}
                />
              </div>

              {/* Filter Departemen */}
              <div className="col-md-3">
                <label className="form-label">Department:</label>
                <select
                  className="form-select"
                  value={filters.department_id}
                  onChange={(e) =>
                    handleFilterChange("department_id", e.target.value)
                  }
                >
                  <option value="">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.department_name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Clear Button */}
              <div className="col-md-4 d-flex align-items-end">
                <Button
                  title="Clear Filters"
                  variant="outline-secondary"
                  type="button"
                  onClick={clearFilters}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="container mt-4 p-4 rounded-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-warning" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <table className="table rounded-3 shadow">
            <thead className="table-warning">
              <tr className="text-center">
                <th scope="col">No</th>
                <th scope="col">Employee ID</th>
                <th scope="col">Employee Name</th>
                <th scope="col">Department</th>
                <th scope="col">Date & Time</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.length > 0 ? (
                attendanceHistory.map((record, i) => (
                  <tr key={record.id || i} className="text-center">
                    <th scope="row">{i + 1}</th>
                    <td className="fw-bold">{record.employee_id}</td>
                    <td>{record.Employee?.name}</td>
                    <td>{record.Employee?.Department?.department_name}</td>
                    <td>{formatDateTime(record.date_attendance)}</td>
                    <td className="text-muted">{record.description}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center text-muted py-4">
                    📭 No attendance records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
