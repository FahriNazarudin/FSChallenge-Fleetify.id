import FormDepartment from "../components/formDepartment";
import FormEmployee from "../components/FormEmployee";
import Navbar from "../components/Navbar";

export default function CreateEmployee() {
  return (
    <div>
      <Navbar />
      <FormEmployee type="add" />
    </div>
  );
}
