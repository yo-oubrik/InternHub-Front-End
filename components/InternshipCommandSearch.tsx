"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Internship } from "@/types/types";
import { cx } from "class-variance-authority";

interface Props {
  defaultValue?: string;
  options: Internship[];
  onSelect: (value: any) => void;
}

export function InternshipCommandSearch({
  defaultValue = "",
  options,
  onSelect,
}: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>();
  const [search, setSearch] = React.useState<string>("");
  const [selectedOption, setSelectedOption] = React.useState<
    Internship | undefined
  >();

  // Filter options based on search input (search companyName)
  const filteredOptions = options?.filter((option) =>
    option.title.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  React.useEffect(() => {
    setSelectedOption(options.find((option) => option.title === value));
  }, [value, options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cx(
            selectedOption ? "text-black" : "text-muted-foreground",
            "w-[250px] bg-white justify-between border-gray-300 hover:border-primary focus:border-primary transition-colors font-medium text-sm rounded-md"
          )}
        >
          <div className="flex items-center gap-2 truncate">
            {selectedOption ? (
              <>
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span className="truncate">{selectedOption.title}</span>
              </>
            ) : (
              "Filter by internship..."
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-[350px] border-gray-300 shadow-lg">
        <Command>
          <CommandInput
            placeholder="Search internships..."
            value={search}
            onValueChange={setSearch}
            className="border-b border-gray-200"
          />
          <CommandList className="max-h-[300px]">
            <CommandEmpty>
              <div className="flex flex-col items-center justify-center text-center">
                <div className="text-gray-400 mb-2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">No internships found.</p>
              </div>
            </CommandEmpty>
            <CommandGroup heading="Available Internships">
              {filteredOptions?.map((option) => (
                <CommandItem
                  key={option.id}
                  value={option.title}
                  onSelect={(currentValue) => {
                    setValue(currentValue);
                    setOpen(false);
                    setSearch("");
                    onSelect(currentValue);
                  }}
                  className="flex items-center gap-2 py-2 px-2 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full bg-primary",
                        value === option.title ? "opacity-100" : "opacity-50"
                      )}
                    ></div>
                    <div className="flex flex-col">
                      <div className="font-medium truncate">{option.title}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {option.company?.name || "Unknown company"}
                      </div>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      "h-4 w-4 text-primary",
                      value === option.title ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default InternshipCommandSearch;
