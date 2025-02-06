import Link from "next/link";

export default async function Home() {
  const departments = await (
    await fetch(`http://${process.env.API_URL}/departments`)
  ).json();

  return (
    <div>
      <h1 className="text-4xl font-bold">Departments</h1>
      <div className="flex flex-col space-y-2 items-center">
        {departments.map((department: any) => (
          <Link
            href={`/departments/${department.name}`}
            key={department.id}
            className="flex justify-center items-center border rounded-lg p-2 hover:scale-110 cursor-pointer transition-transform ease-in-out duration-300"
          >
            {department.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
