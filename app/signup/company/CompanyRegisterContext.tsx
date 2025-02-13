import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { EnterpriseFormData } from "./CompanySignUpForm";
import { CompanyInfoForm } from "./CompanyInfoForm";
import { ContactInfoForm } from "./ContactInfoForm";
import { AdminInfoForm } from "./AdminInfoForm";

export type formSectionstype = {
  title: string;
  component: JSX.Element;
}[];

interface CompanyRegisterContextProps {
  formData: EnterpriseFormData;
  setFormData: (data: Partial<EnterpriseFormData>) => void;
  goToNextSection: () => void;
  goToPreviousSection: () => void;
  currentSection: number;
  formSections: formSectionstype;
}

const CompanyRegisterContext = createContext<
  CompanyRegisterContextProps | undefined
>(undefined);

export const CompanyRegisterProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const formSections = [
    {
      title: "Company Informations",
      component: <CompanyInfoForm />,
    },
    {
      title: "Contact Informations",
      component: <ContactInfoForm />,
    },
    {
      title: "Administrative Informations",
      component: <AdminInfoForm />,
    },
  ];

  const [formData, setFormDataState] = useState<EnterpriseFormData>({
    companyName: "",
    companySize: "",
    description: "",
    address: "",
    contactEmail: "",
    phone: "",
    ice: "",
    rc: "",
    logo: undefined,
    links: "",
  });

  const [currentSection, setCurrentSection] = useState(0);

  const setFormData = (data: Partial<EnterpriseFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
  };

  const goToNextSection = () => {
    if (currentSection >= formSections.length) {
      return toast.error("You're already on the last section.");
    }
    setCurrentSection((prev) => prev + 1);
  };

  const goToPreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1);
    }
  };

  return (
    <CompanyRegisterContext.Provider
      value={{
        formData,
        setFormData,
        goToNextSection,
        goToPreviousSection,
        currentSection,
        formSections,
      }}
    >
      {children}
    </CompanyRegisterContext.Provider>
  );
};

export const useCompanyRegister = () => {
  const context = useContext(CompanyRegisterContext);
  if (!context) {
    throw new Error(
      "useCompanyRegister must be used within a CompanyRegisterProvider"
    );
  }
  return context;
};
