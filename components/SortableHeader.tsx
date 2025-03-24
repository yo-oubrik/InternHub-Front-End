import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { Column } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

interface SortableHeaderProps<T> {
  column: Column<T, unknown>;
  label: string;
}

export function SortableHeader<T>({ column, label }: SortableHeaderProps<T>) {
  const isSorted = column.getIsSorted();
  return (
    <div
      className="flex gap-2 cursor-pointer items-center"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {label}
      <ArrowUp
        className={`ml-2 h-4 w-4 transition-transform ${
          isSorted === "desc" ? "rotate-180" : ""
        }`}
      />
    </div>
  );
}
