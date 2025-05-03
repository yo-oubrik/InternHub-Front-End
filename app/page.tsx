"use client";
import { HomeStatistics } from "./WhyChooseClient";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "@/lib/axios";
import HeroSection from "@/components/HeroSection";
import FeatureSections from "@/components/Features/FeatureSections";

interface SquareProps {
  size: number;
  top: number;
  left: number;
  color: string;
  delay: number;
  duration: number;
  rotation?: number;
  blur?: number;
}

const Square: React.FC<SquareProps> = ({
  size,
  top,
  left,
  color,
  delay,
  duration,
  rotation = 0,
  blur = 0,
}) => {
  return (
    <div
      className="absolute rounded-lg shadow-lg animate-float"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        top: `${top}%`,
        left: `${left}%`,
        backgroundColor: color,
        opacity: Math.random() * 0.3 + 0.1, // 0.1-0.4 opacity
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        transform: `rotate(${rotation}deg)`,
        filter: `blur(${blur}px)`,
        transition: "all 0.5s ease",
      }}
    />
  );
};

export default function Home() {
  const [statistics, setStatistics] = useState<HomeStatistics>({
    onSiteInternshipsCount: 0,
    remoteInternshipsCount: 0,
    totalCompaniesCount: 0,
    totalInternshipsCount: 0,
    totalStudentsCount: 0,
    privatePublicSchoolsCount: 0,
    universitiesCount: 0,
    totalApplicants: 0,
    totalAcceptedApplicants: 0,
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
          privatePublicSchoolsCount: 30,
          universitiesCount: 20,
          totalApplicants: 100,
          totalAcceptedApplicants: 50,
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

  const [squares, setSquares] = useState<SquareProps[]>([]);

  useEffect(() => {
    // Generate random squares for the background
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--chart-1))",
      "hsl(var(--chart-2))",
      "hsl(var(--chart-3))",
      "hsl(var(--chart-4))",
      "hsl(var(--chart-5))",
      "#ff7e5f", // Additional vibrant colors
      "#feb47b",
      "#ffac81",
      "#ff928b",
      "#fec3a6",
    ];

    // Create more squares for a vibrant background
    const newSquares = Array.from({ length: 60 }, () => ({
      size: Math.floor(Math.random() * 80) + 20, // 20-100px
      top: Math.floor(Math.random() * 95), // 0-95%
      left: Math.floor(Math.random() * 90) + 5, // 5-95%
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 5, // 0-5s delay
      duration: Math.random() * 4 + 3, // 3-7s duration
      rotation: Math.floor(Math.random() * 45), // 0-45 degrees rotation
      blur: Math.random() < 0.3 ? Math.random() * 5 : 0, // 30% chance of blur effect
    }));

    setSquares(newSquares);
  }, []);

  return (
    <main className="relative">
      {/* Background squares */}
      <div>
        {squares.map((square, index) => (
          <Square key={index} {...square} />
        ))}
      </div>
      <HeroSection />
      <FeatureSections statistics={statistics} />
    </main>
  );
}
