import FormDepartment from "../components/formDepartment";
import Navbar from "../components/Navbar";

export default function CreateDepartment() {
  return (
    <div>
      <Navbar />
      <FormDepartment type="add" />
    </div>
  );
}
