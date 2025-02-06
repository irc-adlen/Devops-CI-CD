import StudentsList from "./student-list";

export default async function DepartmentPage({
  params,
}: {
  params: { name: string };
}) {
  const { name } = await params;
  const students = await (
    await fetch(`http://${process.env.API_URL}/departments/${name}/students`)
  ).json();

  const department = await (
    await fetch(`http://${process.env.API_URL}/departments/${name}`)
  ).json();

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
