import { StatCard } from "@/components/Cards/StatCard";
import { LineGraph } from "@/components/LineGraph";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  return (
    <div className="min-h-full-except-header max-w-screen-lg mx-auto flex flex-col gap-10 justify-center py-10">
      <h1 className="header">Companies Dashboard</h1>
      <div className={"bg-primary-dark/75 p-5 rounded-lg flex flex-col gap-5"}>
        <div className="stats">
          <StatCard
            count={0}
            label="Total Companies"
            icon={"/admin/companies/icons/companies.png"}
          />
          <StatCard
            count={0}
            label="Pending Companies"
            icon={"/admin/companies/icons/pending.png"}
          />
        </div>
        <div className="stats">
          <StatCard
            count={0}
            label="Total Internships"
            icon={"/admin/companies/icons/internships.png"}
          />
          <StatCard
            count={0}
            label="Flagged Companies"
            icon={"/admin/companies/icons/flagged_companies.png"}
          />
        </div>
      </div>
      <LineGraph
        xAxis={["January", "February", "March"]}
        yAxis={[50, 65, 80]}
        chartLabel="Total Companies by Month"
      />
      <div className="flex gap-4 mx-auto">
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/companies"}> Registered Companies</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/companies/pending"}>Pending Companies</Link>
        </Button>
        <Button size={"lg"} className="hover:opacity-85 transition" asChild>
          <Link href={"/admin/companies/flagged"}>Flagged Companies</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
