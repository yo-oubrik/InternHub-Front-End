import React from 'react'
import { useUser } from '@/context/userContext'
import { Location } from '@/context/internshipContext';
import { Links } from '@/types/types';
import InputField from '../InputField';

const PortfolioInfos = () => {
    const {student , setStudent} = useUser();
    console.log('student : ',student);
  return (
    <div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <InputField
            className="w-full"
            value={student?.firstName || ''}
            type="text"
            onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <InputField
            className="w-full"
            value={student?.lastName || ''}
            type="text"
            onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
          />
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="profileTitle" className="block text-sm font-medium text-gray-700 mb-1">Profile Title</label>
        <InputField
          className="w-full"
          value={student?.profileTitle || ''}
          type="text"
          onChange={(e) => setStudent({ ...student, profileTitle: e.target.value })}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="school" className="block text-sm font-medium text-gray-700 mb-1">School</label>
        <InputField
          className="w-full"
          value={student?.school || ''}
          type="text"
          onChange={(e) => setStudent({ ...student, school: e.target.value })}
        />
      </div>
      <div className="mt-4">
        <label htmlFor="tel" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
        <InputField
          className="w-full"
          value={student?.tel || ''}
          type="text"
          onChange={(e) => setStudent({ ...student, tel: e.target.value })}
        />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <InputField
            className="w-full"
            value={student?.location?.address || ''}
            type="text"
            onChange={(e) => setStudent({ ...student, location: { ...student.location, address: e.target.value } as Location})}
          />
        </div>
        <div>
          <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
          <InputField
            className="w-full"
            value={student?.location?.city || ''}
            type="text"
            onChange={(e) => setStudent({ ...student, location: { ...student.location, city: e.target.value } as Location })}
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country</label>
          <InputField
            className="w-full"
            value={student?.location?.country || ''}
            type="text"
            onChange={(e) => setStudent({ ...student, location: { ...student.location, country: e.target.value } as Location })}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="github" className="block text-sm font-medium text-gray-700 mb-1">Github</label>
          <InputField
            className="w-full"
            value={student?.links?.github || ''}
            type="url"
            onChange={(e) => setStudent({ ...student, links: { ...student.links, github: e.target.value } as Links})}
          />
        </div>
        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
          <InputField
            className="w-full"
            value={student?.links?.linkedin || ''}
            type="url"
            onChange={(e) => setStudent({ ...student, links: { ...student.links, linkedin: e.target.value } as Links })}
          />
        </div>
        <div>
          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Portfolio or Website</label>
          <InputField
            className="w-full"
            value={student?.links?.website || ''}
            type="url"
            onChange={(e) => setStudent({ ...student, links: { ...student.links, website: e.target.value } as Links })}
          />
        </div>
      </div>
    </div>
  )
}

export default PortfolioInfos
