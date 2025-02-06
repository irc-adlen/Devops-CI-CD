"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface ListDeptProps {
  apiUrl: string;
}

export const ListDept: React.FC<ListDeptProps> = ({ apiUrl }) => {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetch(`http://${apiUrl}/departments`)
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error(error));

    return () => {
      setDepartments([]);
    };
  }, [apiUrl]);

  return (
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
  );
};
