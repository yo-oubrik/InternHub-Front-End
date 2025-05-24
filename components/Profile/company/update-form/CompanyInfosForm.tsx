import React, { useRef } from "react";
import ProfileAvatar from "../../ProfileAvatar";
import { useUser } from "@/context/userContext";
import InputField from "@/components/InputField";
import TextEditor from "@/components/TextEditor";
import { Label } from "@/components/ui/label";
import { Globe, Linkedin, Twitter } from "lucide-react";

interface CompanyInfosFormProps {
  logo: File | null;
  setLogo: (file: File | null) => void;
}

const CompanyInfosForm = ({ logo, setLogo }: CompanyInfosFormProps) => {
  const { company, setCompany } = useUser();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div onClick={handleAvatarClick} className="cursor-pointer">
          <ProfileAvatar
            className="w-28 h-28 text-5xl bg-gray-800 overflow-hidden"
            avatarImage={
              logo ? URL.createObjectURL(logo) : company?.profilePicture ?? ""
            }
            avatarFallback={<span className="text-white">Logo</span>}
          />
        </div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            setLogo(e.target.files?.[0] ?? null);
          }}
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Label htmlFor="companyName" className="self-center">
          Company Name
        </Label>
        <InputField
          id="companyName"
          type="text"
          placeholder="Company Name"
          value={company.name}
          onChange={(e) => setCompany({ ...company, name: e.target.value })}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Label htmlFor="phone" className="self-center">
          Phone Number
        </Label>
        <InputField
          id="phone"
          type="text"
          placeholder="Phone Number"
          value={company?.tel}
          onChange={(e) => setCompany({ ...company, tel: e.target.value })}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Label htmlFor="ice" className="self-center">
          ICE
        </Label>
        <InputField
          id="ice"
          type="text"
          placeholder="ICE"
          value={company.ice}
          onChange={(e) => setCompany({ ...company, ice: e.target.value })}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Linkedin className="self-center" />
        <InputField
          type="text"
          placeholder="LinkedIn link"
          value={company.links?.linkedin}
          onChange={(e) =>
            setCompany({
              ...company,
              links: { ...company.links, linkedin: e.target.value },
            })
          }
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Twitter className="self-center" />
        <InputField
          type="text"
          placeholder="Twitter link"
          value={company.links?.twitter}
          onChange={(e) =>
            setCompany({
              ...company,
              links: { ...company.links, twitter: e.target.value },
            })
          }
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Globe className="self-center" />
        <InputField
          type="text"
          placeholder="Website link"
          value={company.links?.website}
          onChange={(e) =>
            setCompany({
              ...company,
              links: { ...company.links, website: e.target.value },
            })
          }
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
        />
      </div>
      <div className="grid grid-cols-[120px_1fr] gap-4">
        <Label htmlFor="description">Description</Label>
        <TextEditor
          value={company.description}
          onChange={(value: string) =>
            setCompany({ ...company, description: value })
          }
          style={{
            minHeight: "150px",
            backgroundColor: "#fff",
            focusBorderColor: "#FF3819",
          }}
          modules={{ toolbar: true }}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default CompanyInfosForm;
