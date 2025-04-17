import { Company, Role } from "@/types/types";
import { DataTable } from "../data-table";
import { pendingCompanyColumns } from "./pendingCompanyColumns";

async function getData(): Promise<Company[]> {
  return [
    {
      name: "Company 1",
      createdAt: new Date(),
      description: "Description 1",
      ice: "ICE 1",
      rc: "RC 1",
      profilePicture: "Logo 1",
      phone: "Phone 1",
      size: "Size 1",
      updatedAt: new Date(),
      internships: [],
      id: "1",
      email: "x@y.z",
      role: Role.COMPANY,
      applicationDate: new Date(),
    },
    {
      name: "Company 2",
      createdAt: new Date(),
      description: "Description 2",
      ice: "ICE 2",
      rc: "RC 2",
      profilePicture: "Logo 2",
      phone: "Phone 2",
      size: "Size 2",
      updatedAt: new Date(),
      internships: [],
      id: "2",
      email: "a@b.c",
      role: Role.COMPANY,
      applicationDate: new Date(),
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-4">Pending Companies List</h3>
      <DataTable columns={pendingCompanyColumns} data={data} />
    </div>
  );
}
