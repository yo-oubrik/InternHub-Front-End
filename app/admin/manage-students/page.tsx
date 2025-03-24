import { StatCard } from "@/components/Cards/StatCard";
import { LineGraph } from "@/components/LineGraph";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-full-except-header max-w-screen-lg mx-auto flex flex-col gap-10 justify-center py-10">
      <h1 className="header">Dashboard</h1>
      <div className={"bg-primary-dark/75 p-5 rounded-lg flex flex-col gap-5"}>
        <div className="stats">
          <StatCard
            count={0}
            label="Total Students"
            icon={"/admin/students/icons/total_students.png"}
          />
          <StatCard
            count={0}
            label="Flagged Students"
            icon={"/admin/students/icons/flagged_students.png"}
          />
        </div>
      </div>
      <LineGraph
        xAxis={["January", "February", "March"]}
        yAxis={[100, 120, 150]}
        chartLabel="Total Students by Month"
      />
      <div className="flex gap-4 mx-auto">
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/students"}>Students List</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/flagged-students"}>Flagged Students</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
