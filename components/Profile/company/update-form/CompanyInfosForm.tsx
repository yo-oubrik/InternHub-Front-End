import React, { useRef } from 'react';
import ProfileAvatar from '../../ProfileAvatar';
import { useUser } from '@/context/userContext';
import InputField from '@/components/InputField';
import TextEditor from '@/components/TextEditor';
import { Label } from '@/components/ui/label';
import { Globe, Linkedin, Twitter } from 'lucide-react';

const CompanyInfosForm = () => {
    const { company } = useUser();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // const { name, value } = e.target;
        // setCompanyInfo({ ...companyInfo, [name]: value });
    };

    const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // const file = event.target.files?.[0];
        // if (file) {
        //   try {
        //     const publicUrl = await uploadFileToSupabase(file, {
        //       bucketName: 'images',
        //       fileName: `profile-picture-${Date.now()}.${file.name.split('.').pop()}`,
        //     });
        //     setCompanyInfo({ ...companyInfo, profilePicture: publicUrl });
        //     toast.success('Profile picture uploaded successfully!');
        //   } catch (error) {
        //     console.error('Error uploading profile picture:', error);
        //     toast.error('Failed to upload profile picture.');
        //   }
        // }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <div onClick={handleAvatarClick} className="cursor-pointer">
                    <ProfileAvatar
                        className="w-28 h-28 text-5xl bg-gray-800 overflow-hidden"
                        avatarImage={company.profilePicture ?? ""}
                        avatarFallback={<span className="text-white">Logo</span>}
                    />
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageSelect}
                />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Label htmlFor="companyName" className='self-center'>Company Name</Label>
              <InputField
                id="companyName"
                type="text"
                placeholder="Company Name"
                value={company.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Label htmlFor="phone" className='self-center'>Phone Number</Label>
              <InputField
                id="phone"
                type="text"
                placeholder="Phone Number"
                value={company.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Label htmlFor="email" className='self-center'>Email Address</Label>
              <InputField
                id="email"
                type="email"
                placeholder="Email Address"
                value={company.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Label htmlFor="ice" className='self-center'>ICE</Label>
              <InputField
                id="ice"
                type="text"
                placeholder="ICE"
                value={company.ice}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Label htmlFor="size" className='self-center'>Company Size</Label>
              <InputField
                id="size"
                type="text"
                placeholder="Company Size"
                value={company.size}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Linkedin className='self-center'/>
              <InputField
                type="text"
                placeholder="LinkedIn link"
                value={company.links?.linkedin}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Twitter className='self-center'/>
              <InputField
                type="text"
                placeholder="Twitter link"
                value={company.links?.twitter}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">
              <Globe className='self-center'/>
              <InputField
                type="text"
                placeholder="Website link"
                value={company.links?.website}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-white border border-gray-300 rounded"
              />
            </div>
            <div className="grid grid-cols-[120px_1fr] gap-4">              
              <Label htmlFor="description">Description</Label>
              <TextEditor
              value={company.description}
              onChange={() => {}}
              style={{ minHeight: '150px', backgroundColor: '#fff' , focusBorderColor: '#FF3819'}}
              modules={{ toolbar: true }}
              className="w-full"
              />
            </div>
        </div>
    );
};

export default CompanyInfosForm;
