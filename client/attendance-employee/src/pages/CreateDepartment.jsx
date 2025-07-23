import FormDepartment from "../components/formDepartment";

export default function CreateDepartment() {
  return (
    <div>
      <h1 className="text-center mb-4">Create Department Page</h1>
      <FormDepartment type="add" />
    </div>
  );
}
