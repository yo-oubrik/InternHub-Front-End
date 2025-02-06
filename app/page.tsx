"use client";
import Link from "next/link";
import JobSearchSection from "./JobSearchSection";
import { Button } from "@/Components/ui/button";
import WhyChooseSection from "./WhyChooseSection";
import ReadyToStartSection from "./ReadyToStartSection";
import { Users } from "lucide-react";

export default function Home() {

  return (
    <main>
      <JobSearchSection />
      <WhyChooseSection />
      {/* <ReadyToStartSection /> */}
    </main>
  );
}
