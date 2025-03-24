import { Role, Student } from "@/types/types";
import { studentColumns } from "./studentColumns";
import { DataTable } from "./data-table";

async function getData(): Promise<Student[]> {
  return [
    {
      id: "728ed52f",
      email: "student@gmail.com",
      firstName: "youssef",
      lastName: "oubrik1",
      profilePicture: "sss",
      role: Role.STUDENT,
      joinedAt: new Date("2012/02/12"),
    },
    {
      id: "728ed52f",
      email: "student@gmail.com",
      firstName: "youssef",
      lastName: "oubrik",
      profilePicture: "sss",
      role: Role.STUDENT,
      joinedAt: new Date(),
    },
    {
      id: "728ed52f",
      email: "student@gmail.com",
      firstName: "youssef",
      lastName: "oubrik",
      profilePicture: "sss",
      role: Role.STUDENT,
      joinedAt: new Date(),
    },
    {
      id: "728ed52f",
      email: "student@gmail.com",
      firstName: "youssef",
      lastName: "oubrik",
      profilePicture: "sss",
      role: Role.STUDENT,
      joinedAt: new Date(),
    },
    {
      id: "728ed52f",
      email: "student1@gmail.com",
      firstName: "youssef",
      lastName: "oubrik",
      profilePicture: "sss",
      role: Role.STUDENT,
      joinedAt: new Date(),
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-4">Students List</h3>
      <DataTable columns={studentColumns} data={data} />
    </div>
  );
}
