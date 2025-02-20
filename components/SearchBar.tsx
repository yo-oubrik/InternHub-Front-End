import { LucideIcon } from "lucide-react";
import { Input } from "./ui/input";
import Button from "./Button";

interface SearchBoxProps {
    placeholder: string; // Placeholder text for the input field
    buttonLabel: string; // Label for the search button
    onSearch: (searchTerm: string) => void; // Callback for the search action
    Icon?: LucideIcon; // Optional icon for the button
    IconSize?: number; // Optional size for the icon
}

const SearchBar = ({
    placeholder,
    buttonLabel,
    onSearch,
    Icon,
    IconSize = 20
}: SearchBoxProps) => {
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchTerm = (e.target as HTMLFormElement).search.value;
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSearch} className="gap-4 items-center flex">
            <Input
                name="search"
                type="text"
                placeholder={placeholder}
                className="flex-1 bg-white text-black p-5 placeholder:text-xl"
            />
            <Button
                label={buttonLabel}
                Icon={Icon}
                onClick={() => { }}
                className="text-xl"
                iconSize={IconSize}
            />
        </form>
    );
};

export default SearchBar;
