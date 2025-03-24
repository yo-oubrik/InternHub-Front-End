"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Dot } from "lucide-react";
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
import { CompanyDTO } from "@/types/types";
import { cx } from "class-variance-authority";

interface Props {
    defaultValue? : string ; 
    options: {
        name: string;
        logo: string;
        address: string;
    }[];
    onSelect: (value: string) => void;
}

export function SearchableCombobox( {defaultValue="" , options , onSelect} : Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState<string>(defaultValue); 
  const [search, setSearch] = React.useState<string>("");
  const initialCompanyState = {name : "" , logo : "" , address : ""};
  const [selectedOption , setSelectedOption] = React.useState<CompanyDTO | undefined>();

  // Filter options based on search input (search companyName)
  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(search.toLowerCase())
  );

  React.useEffect(() => {
    setSelectedOption(options.find((option) => option.name === value) || undefined);
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cx(selectedOption ? "text-black" : "text-muted-foreground", "w-full justify-between font-medium text-sm focus:ring-1 focus:ring-primary rounded-md")}
        >
          {selectedOption
            ? `${selectedOption.name} - ${selectedOption.address}`
            : "Select company..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-fit">
        <Command>
          <CommandInput
            placeholder="Search companies..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No companies found.</CommandEmpty>
            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={option.name}
                  value={option.name}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                    setSearch("");
                    onSelect(currentValue);
                  }
                }
                  className="flex items-center gap-2"
                >
                  <Check
                    className={cn(
                      "h-4 w-4 flex-shrink-0",
                      value === option.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <div className="flex flex-col gap-2 flex-1">
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground truncate">
                        {option.address}
                      </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SearchableCombobox;