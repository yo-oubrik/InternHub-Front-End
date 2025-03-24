"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface YearPickerProps {
  value: string;
  onValueChange: (value: string) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ value, onValueChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => (currentYear - i).toString());

  return (
    <Select value={value || ""} onValueChange={onValueChange}>
      <SelectTrigger className={cn("text-muted-foreground placeholder:text-muted-foreground focus:text-black focus:ring-1 focus:ring-primary rounded-md font-medium")}>
        <SelectValue placeholder="When did you obtain your certificate?" />
      </SelectTrigger>
      <SelectContent className="max-h-[240px]">
        {years.map((year) => (
          <SelectItem 
            key={year} 
            value={year}
            className={cn(
              year === value && "bg-gray-100"
            )}
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default YearPicker; 