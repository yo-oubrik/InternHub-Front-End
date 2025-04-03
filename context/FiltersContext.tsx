import React, {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";

interface FiltersProps {
  remote: boolean;
  onSite: boolean;
  hybrid: boolean;
  pfa: boolean;
  pfe: boolean;
  initiation: boolean;
  renumerated: boolean;
}

interface FiltersContextProps {
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
  handleFilterChange: (filterName: keyof FiltersProps) => void;
}

const FiltersContext = createContext<FiltersContextProps | null>(null);

export const FiltersContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [filters, setFilters] = useState<FiltersProps>({
    remote: false,
    onSite: false,
    hybrid: false,
    pfa: false,
    pfe: false,
    initiation: false,
    renumerated: false,
  });

  const handleFilterChange = (filterName: keyof FiltersProps) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName], // Now TypeScript recognizes the key
    }));
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        setFilters,
        handleFilterChange,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error("useFilters must be used within a FiltersContextProvider");
  }
  return context;
};
