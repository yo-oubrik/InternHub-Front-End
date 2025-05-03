"use client";
import { useEffect, useState } from "react";
import { FlaggedCompaniesTable } from "./FlaggedCompaniesTable";
import { useCompanies } from "@/context/CompaniesContext";
import { FlaggedCompanyOverview } from "@/types/types";

const Page = () => {
  const { fetchFlaggedCompaniesOverview } = useCompanies();
  const [flaggedCompaniesOverview, setFlaggedCompaniesOverview] = useState<
    FlaggedCompanyOverview[]
  >([]);

  useEffect(() => {
    async function fetchData() {
      const overviewOfFlaggedCompanies = await fetchFlaggedCompaniesOverview();
      setFlaggedCompaniesOverview(overviewOfFlaggedCompanies);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h3 className="header mb-5">Flagged Companies Overview</h3>
      <p className="mb-3 text-gray-950">
        Manage companies that have been flagged for inappropriate behavior.
      </p>
      <FlaggedCompaniesTable data={flaggedCompaniesOverview} />
    </div>
  );
};

export default Page;
