import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import http from "../lib/http";

export default function FormDepartment(props) {
  const { id, type, departments } = props;
  const [name, setName] = useState("");
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (type === "edit" && departments) {
      setName(departments.department_name || "");
      setClockIn(departments.max_clock_in_time || "");
      setClockOut(departments.max_clock_out_time || "");
    }
  }, [type, departments]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requestData = {
        department_name: name,
        max_clock_in_time: clockIn,
        max_clock_out_time: clockOut,
      };

      const response = await http({
        method: type === "add" ? "POST" : "PUT",
        url: type === "add" ? "/departments" : `/departments/${id}`,
        data: requestData,
      });

      console.log(response.data);

      // Reset form only for add operation
      if (type === "add") {
        setName("");
        setClockIn("");
        setClockOut("");
      }

      navigate("/departments");
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
          <div className="card">
            <div className="card-header">
              <h5 className="card-title mb-0">
                {type === "add" ? "Create New Department" : "Edit Department"}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="departmentName" className="form-label">
                    Nama Departemen <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="departmentName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Masukkan nama departemen"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="clockInTime" className="form-label">
                    Waktu Maksimal Absen Masuk{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="clockInTime"
                    value={clockIn}
                    onChange={(e) => setClockIn(e.target.value)}
                    required
                  />
                  <div className="form-text">
                    Contoh: 08:00 untuk jam 8 pagi
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="clockOutTime" className="form-label">
                    Waktu Maksimal Absen Keluar{" "}
                    <span className="text-danger">*</span>
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    id="clockOutTime"
                    value={clockOut}
                    onChange={(e) => setClockOut(e.target.value)}
                    required
                  />
                  <div className="form-text">
                    Contoh: 17:00 untuk jam 5 sore
                  </div>
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-warning text-white"
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
                      "Create Department"
                    ) : (
                      "Update Department"
                    )}
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/departments")}
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
