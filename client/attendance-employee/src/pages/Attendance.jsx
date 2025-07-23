import Navbar from "../components/Navbar";

export default function Attendance() {
  return (
    <div>
      <Navbar />
      <div
        className="container mt-2 rounded p-1 w-50 "
        style={{ backgroundColor: "#ffd501  " }}
      >
        <h5 className="text-center" style={{ color: "#ffff " }}>
          ATTENDANCE PAGE
        </h5>
      </div>
    </div>
  );
}
