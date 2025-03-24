import { Internship, SalaryType, WorkMode } from "@/types/types";
import { internshipColumns } from "./internshipColumns";
import { DataTable } from "../../data-table";

async function getData(): Promise<Internship[]> {
  return [
    {
      applicants: [],
      companyId: "Company A",
      createdAt: new Date("2022-02-10"),
      description: "Description 1",
      id: "1",
      title: "Software Engineer Intern",
      domain: "Software",
      location: "Remote",
      updatedAt: new Date("2022-02-10"),
      duration: 3,
      likes: [],
      negotiable: true,
      tags: [],
      renumerated: true,
      salary: 1000,
      salaryType: SalaryType.MONTH,
      skills: [],
      workMode: WorkMode.HYBRID,
    },
    {
      applicants: [],
      companyId: "Company B",
      createdAt: new Date("2022-02-10"),
      description: "Description 2",
      id: "2",
      title: "Software Engineer Intern",
      domain: "Software",
      location: "Remote",
      updatedAt: new Date("2022-02-10"),
      duration: 3,
      likes: [],
      negotiable: true,
      tags: [],
      renumerated: true,
      salary: 1000,
      salaryType: SalaryType.MONTH,
      skills: [],
      workMode: WorkMode.HYBRID,
    },
    // Add more sample data as needed
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-4">Internships List</h3>
      <DataTable columns={internshipColumns} data={data} />
    </div>
  );
}
