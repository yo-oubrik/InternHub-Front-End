import { FlaggedStudent, flagSeverity } from "@/types/types";
import { FlaggedStudentsClient } from "./FlaggedStudentsClient";

async function getData(): Promise<FlaggedStudent[]> {
  return [
    {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      reason: "Academic underperformance",
      flaggedAt: new Date("2024-01-15"),
      severity: flagSeverity.HIGH,
      company: "Google",
      companyId: "1",
      description: "John is a great student with a lot of potential.",
      offerId: "1",
      studentId: "1",
      screenshots: [],
      internshipId: "1",
      internshipTitle: "Software Engineering Intern",
    },
    {
      id: "2",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.deo@exmaple.com",
      reason: "Behavioral concerns",
      flaggedAt: new Date("2024-01-15"),
      severity: flagSeverity.MEDIUM,
      company: "Facebook",
      companyId: "2",
      description: "Jane is a great student with a lot of potential.",
      offerId: "2",
      studentId: "2",
      screenshots: [
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
        "https://picsum.photos/800/600",
      ],
      internshipId: "2",
      internshipTitle: "Product Management",
    },
    {
      id: "3",
      firstName: "Alice",
      lastName: "Smith",
      email: "smith@smith.com",
      reason: "Behavioral concerns",
      flaggedAt: new Date("2024-01-15"),
      severity: flagSeverity.LOW,
      company: "Amazon",
      companyId: "3",
      description: "Alice is a great student with a lot of potential.",
      offerId: "3",
      studentId: "3",
      screenshots: ["https://picsum.photos/800/600"],
      internshipId: "3",
      internshipTitle: "Data Science Intern",
    },
  ];
}
const Page = async () => {
  const flaggedStudents = await getData();
  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-5">Flagged Students List</h3>
      <p className="mb-3 text-gray-950">
        Manage students who have been flagged for behavioral concerns.
      </p>
      <FlaggedStudentsClient flaggedStudents={flaggedStudents} />
    </div>
  );
};

export default Page;
