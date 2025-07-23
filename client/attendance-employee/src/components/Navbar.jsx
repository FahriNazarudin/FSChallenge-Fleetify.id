import { Link } from "react-router";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container d-flex justify-content-center ">
          <div
            className="collapse navbar-collapse d-flex justify-content-center "
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/departments"
                >
                  Department
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/employees">
                  Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendances">
                  Attendance
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendance-histories">
                  AttendaceHistory
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
