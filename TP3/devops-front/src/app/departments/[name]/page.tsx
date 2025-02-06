import StudentsList from "./student-list";

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const res = await fetch(
    `http://${process.env.API_URL}/departments/${name}/students`
  );

  const res2 = await fetch(`http://${process.env.API_URL}/departments/${name}`);

  if (!res.ok || !res2.ok) {
    return <p className="text-red-500">Error fetching data from the API</p>;
  }

  const students = await res.json();
  const department = await res2.json();

  return (
    <div className="flex flex-col space-y-2 items-center">
      <h1 className="text-4xl font-bold">Students</h1>
      <StudentsList
        students={students}
        departmentId={department.id}
        departmentName={department.name}
        apiURL={process.env.API_URL as string}
      />
    </div>
  );
}
