"use client";
import React from "react";
import { formatDates } from "@/utils/fotmatDates";
import { Pencil, Trash, Building2, MapPin, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Internship, SalaryType } from "@/types/types";
import formatMoney from "@/utils/formatMoney";

interface InternshipProps {
  internship: Internship;
}

function Myinternship({ internship }: InternshipProps) {
  const router = useRouter();
  // const { isAuthenticated } = useAuth();

  // Fonction pour nettoyer le HTML et tronquer le texte
  const cleanAndTruncateHTML = (html: string, maxLength: number = 120) => {
    // Supprimer les balises HTML
    const textOnly = html.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ");
    // Tronquer si nécessaire
    return textOnly.length > maxLength
      ? textOnly.substring(0, maxLength) + "..."
      : textOnly;
  };

  return (
    <div className="p-8 bg-white rounded-xl flex flex-col gap-5">
      <div className="flex justify-between items-start">
        <div
          className="flex-1 cursor-pointer"
          onClick={() => router.push(`/internship/${internship.id}`)}
        >
          <CardTitle className="text-xl font-bold truncate mb-2">
            {internship.title}
          </CardTitle>
        </div>

        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-red-500"
          >
            <Trash size={14} />
          </Button>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {cleanAndTruncateHTML(internship.description)}
      </div>

      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="bg-blue-50">
          {internship.workMode}
        </Badge>
        {internship.paid && (
          <Badge variant="outline" className="bg-green-50">
            {formatMoney(internship.salary)} /{" "}
            {internship.salaryType.toLowerCase()}
            {internship.negotiable && " (Negotiable)"}
          </Badge>
        )}
      </div>

      <div className="space-x-2">
        {internship.tags.map((tag, index) => (
          <Badge key={index} variant="outline" className="bg-orange-50">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground mt-2">
        <span className="flex items-center gap-1">
          <Calendar size={14} />
          Posted {formatDates(internship.createdAt)}
        </span>

        <span>{internship.applicants.length} applicant(s)</span>
      </div>
    </div>
  );
}

export default Myinternship;
