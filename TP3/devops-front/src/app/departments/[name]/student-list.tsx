"use client";

import { useState } from "react";

interface StudentsListProps {
  students: any[];
  departmentId: string;
  departmentName: string;
  apiURL: string;
}

export default function StudentsList({
  students,
  departmentId,
  departmentName,
  apiURL,
}: StudentsListProps) {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [displayedStudents, setDisplayedStudents] = useState(students);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch(`http://${apiURL}/students`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        department: {
          id: departmentId,
          name: departmentName,
        },
      }),
    });

    if (res.ok) {
      setDisplayedStudents([
        ...displayedStudents,
        { id: Math.random().toString(36).substr(2, 9), firstname, lastname },
      ]);
    }

    setFirstname("");
    setLastname("");
  };

  return (
    <>
      <ul className="flex flex-col space-y-2 items-center">
        {displayedStudents.map((student: any) => (
          <li
            key={student.id}
            className="flex justify-center items-center border rounded-lg p-2 hover:scale-110 cursor-pointer transition-transform ease-in-out duration-300"
          >
            {student.firstname} {student.lastname}
          </li>
        ))}
      </ul>
      <form
        onSubmit={handleSubmit}
        className="flex space-x-2 items-center justify-center mt-2"
      >
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
          className="border rounded-lg p-2 text-black"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
          className="border rounded-lg p-2 text-black"
        />
        <button
          type="submit"
          className="border rounded-lg p-2 bg-blue-500 text-white hover:bg-blue-700"
        >
          Add Student
        </button>
      </form>
    </>
  );
}
