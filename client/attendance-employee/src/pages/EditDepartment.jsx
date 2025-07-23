import { useEffect, useState } from "react";
import { useParams } from "react-router";
import FormDepartment from "../components/formDepartment";
import http from "../lib/http";
import Navbar from "../components/Navbar";

export default function EditDepartment() {
  const { id } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDepartment() {
      try {
        setLoading(true);
        const response = await http({
          method: "GET",
          url: `/departments/${id}`,
        });
        setDepartment(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching department:", error);
        setError("Failed to fetch department data");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchDepartment();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading department data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center mt-5" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div>
      <Navbar />

        <FormDepartment type="edit" id={id} departments={department} />

    </div>
  );
}
