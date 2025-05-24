"use client";

import * as React from "react";
import { format, parse } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";

interface Props {
  value?: string;
  setDateValue: (value: string) => void;
  resetDate?: boolean;
  className?: string;
}

export function DatePicker({
  value = "",
  setDateValue,
  resetDate,
  className,
}: Props) {
  const [date, setDate] = useState<Date | undefined>(
    value ? parse(value, "MMM-yyyy", new Date()) : undefined
  );

  console.log("date : ", date);

  useEffect(() => {
    if (resetDate) {
      setDate(undefined);
    }
  }, [resetDate]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-fit justify-start text-left font-normal text-black",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon />
          {date ? format(date, "MMM yyyy") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value);
            value && setDateValue(format(value, "MMM-yyyy"));
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
