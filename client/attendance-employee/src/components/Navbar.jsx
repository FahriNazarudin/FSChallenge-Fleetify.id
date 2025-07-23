import {  Link, NavLink, useLocation, useNavigate } from "react-router";
import logo from "../assets/image.png";
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <nav
      className="container-fluid  "
      style={{
        backgroundColor: "rgba(80, 80, 80, 0.5)",
      }}
    >
      <div
        style={{ color: "white", textDecoration: "none" }}
        className="navbar navbar-expand-lg"
      >
        <div classname="container-fluid  ">
          <Link classname="navbar-brand" />
          <img
            src={logo}
            alt="Logo"
            height="40"
            className="d-inline-block align-text-top"
            onClick={() => navigate("/")}
          />
          <Link />
        </div>

        <div className="container d-flex justify-content-end ">
          <div className="collapse navbar-collapse d-flex justify-content-end ">
            <ul className="navbar-nav gap-3">
              <li className="nav-item ">
                <NavLink
                  className="nav-link rounded-5 p-2 "
                  aria-current="page"
                  style={{
                    color: "white",
                    backgroundColor: isActive("/departments")
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    transition: "all 0.3s ease",
                  }}
                  to="/departments"
                >
                  Department
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link rounded-5 p-2"
                  to="/employees"
                  style={{
                    color: "white",
                    backgroundColor: isActive("/employees")
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    transition: "all 0.3s ease",
                  }}
                >
                  Employee
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link rounded-5 p-2"
                  style={{
                    color: "white",
                    backgroundColor: isActive("/attendances")
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    transition: "all 0.3s ease",
                  }}
                  to="/attendances"
                >
                  Attendance
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link rounded-5 p-2"
                  style={{
                    color: "white",
                    backgroundColor: isActive("/attendance-histories")
                      ? "rgba(255, 255, 255, 0.2)"
                      : "transparent",
                    transition: "all 0.3s ease",
                  }}
                  to="/attendance-histories"
                >
                  Attendace History
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
