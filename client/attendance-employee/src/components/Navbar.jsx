import { Link } from "react-router";

export default function Navbar() {
  return (
    <div>
      <nav
        style={{ color: "white" }}
        className="navbar navbar-expand-lg bg-warning"
      >
        <div className="container d-flex justify-content-center ">
          <div className="collapse navbar-collapse d-flex justify-content-center ">
            <ul className="navbar-nav">
              <li className="nav-item ">
                <Link
                  className="nav-link "
                  aria-current="page"
                  style={{
                    color: "white",
                  }}
                  to="/departments"
                >
                  Department
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/employees"
                  style={{
                    color: "white",
                  }}
                >
                  Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                  }}
                  to="/attendances"
                >
                  Attendance
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{
                    color: "white",
                  }}
                  to="/attendance-histories"
                >
                  Attendace History
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
