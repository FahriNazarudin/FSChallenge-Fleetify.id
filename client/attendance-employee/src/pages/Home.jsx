import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div
        className="container mt-5 d-flex justify-content-center align-items-center rounded-5"
        style={{
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          height: "70vh",
          borderRadius: "1.5rem",
        }}
      >
        <h2>Welcome to the Attendance Employee</h2>
      </div>
    </div>
  );
}
