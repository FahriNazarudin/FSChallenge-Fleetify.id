import Navbar from "../components/Navbar";

export default function AttendaceHistories() {
  return (
    <div>
      <Navbar />
      <div
        className="container mt-2 rounded p-1 justify-content-center w-50"
        style={{ backgroundColor: "#ffd501  " }}
      >
        <h5 className="text-center" style={{ color: "#ffff " }}>
          ATTENDANCE HISTORY PAGE
        </h5>
      </div>
    </div>
  );
}
