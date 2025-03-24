import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "../data-table";
import { flaggedCompanyColumns } from "./flaggedCompanyColumns";
import { flagSeverity } from "@/types/types";

async function getData() {
  // Replace with actual API call
  return [
    {
      id: "1",
      name: "Company A",
      email: "contact@companya.com",
      reason: "Inappropriate behavior",
      severity: flagSeverity.HIGH,
      flaggedAt: new Date("2024-03-19"),
      screenshots: ["url1", "url2"],
    },
    // Add more sample data
  ];
}

export default async function FlaggedCompaniesPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Flagged Companies</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={flaggedCompanyColumns} data={data} />
        </CardContent>
      </Card>
    </div>
  );
}
