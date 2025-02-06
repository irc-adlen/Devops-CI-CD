import { ListDept } from "./departments/list-dept";

export default async function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold">Departments</h1>
      <ListDept apiUrl={process.env.API_URL || ""} />
    </div>
  );
}
