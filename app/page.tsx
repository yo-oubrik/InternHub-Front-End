"use client";
import Image from "next/image";
import WhyChooseClient, { HomeStatistics } from "./WhyChooseClient";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "@/lib/axios";

export default function Home() {
  const [statistics, setStatistics] = useState<HomeStatistics>({
    onSiteInternshipsCount: 0,
    remoteInternshipsCount: 0,
    totalCompaniesCount: 0,
    totalInternshipsCount: 0,
    totalStudentsCount: 0,
  });
  useEffect(() => {
    async function fetchStatistics() {
      try {
        const [
          { data: totalCompanies },
          { data: totalStudents },
          { data: totalInternships },
          { data: remoteInternships },
          { data: onSiteInternships },
        ] = await Promise.all([
          axios.get("/companies/count"),
          axios.get("/students/count"),
          axios.get("/internships/count"),
          axios.get("/internships/count/remote"),
          axios.get("/internships/count/on-site"),
        ]);

        setStatistics({
          totalCompaniesCount: totalCompanies || 0,
          totalStudentsCount: totalStudents || 0,
          totalInternshipsCount: totalInternships || 0,
          remoteInternshipsCount: remoteInternships || 0,
          onSiteInternshipsCount: onSiteInternships || 0,
        });
      } catch (err) {
        toast.error("Failed to fetch statistics", {
          id: "fetch-statistics",
        });
        console.error("Failed to fetch statistics:", err);
      }
    }

    fetchStatistics();
  }, []);

  return (
    <main>
      <section className="px-20 bg-background min-h-[calc(100vh-var(--header-height))] flex items-center justify-between">
        <div className="text-center text-black">
          <h1 className="text-4xl text-primary md:text-5xl font-bold mb-10 max-w-[700px]">
            Find Your Dream Internship or Perfect Candidate
          </h1>
          <p className="text-xl mb-8">
            Connect with thousands of employers and internship seekers on our
            platform
          </p>
        </div>
        <div>
          <Image
            src="/homepage/job_recretment.png"
            alt="Recretment"
            width={680}
            height={680}
          />
        </div>
      </section>
      <WhyChooseClient statistics={statistics} />
    </main>
  );
}
