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
  paid: boolean | null;
}

interface FiltersContextProps {
  filters: FiltersProps;
  setFilters: React.Dispatch<React.SetStateAction<FiltersProps>>;
  handleFilterChange: (
    filterName: keyof FiltersProps,
    value: boolean | null
  ) => void;
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
    paid: null,
  });

  const handleFilterChange = (
    filterName: keyof FiltersProps,
    value: boolean | null
  ) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
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
