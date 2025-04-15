
import { CompanyMaps } from '@/components/Profile/company/CompanyMaps'
import CompanyProfile from '@/components/Profile/company/CompanyProfile'
import CompanyProfileStats from '@/components/Profile/company/CompanyProfileStats'
import React from 'react'

const page = () => {
  return (
    <div className='py-11 flex flex-col gap-8'>
        <div className='flex gap-2 w-full'>
          <CompanyProfile />
          <CompanyProfileStats applicants={1200} internships={10} />
        </div>
        <CompanyMaps />
    </div>
  )
}

export default page
