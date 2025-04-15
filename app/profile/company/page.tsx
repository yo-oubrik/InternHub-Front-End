"use client"
import Myinternship from '@/components/InternshipItem/MyInternship'
import { mockInternships } from '@/components/InternshipItem/MyInternshipsList'
import { CompanyMaps } from '@/components/Profile/company/CompanyMaps'
import CompanyProfile from '@/components/Profile/company/CompanyProfile'
import CompanyProfileStats from '@/components/Profile/company/CompanyProfileStats'
import { Button } from '@/components/ui/button'
import { Internship } from '@/types/types'
import React, { useState } from 'react'

const page = () => {
  const internships = mockInternships
  const itemsPerPage = 9
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(internships.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentInternships = internships.slice(startIndex, endIndex)

  return (
    <div className='py-11 flex flex-col gap-8'>
      <div className='flex gap-3 w-full'>
        <CompanyProfile />
        <CompanyMaps />
      </div>
      <CompanyProfileStats applicants={1200} internships={10} />
      <h1 className='header !font-medium mt-7 mb-5'>Company Internships</h1>
      {
        internships.length > 0 ? (
          <>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentInternships.map((internship) => (
                <Myinternship
                  key={internship.id}
                  internship={internship}
                />
              ))}
            </ul>

            <div className="flex items-center justify-end gap-4 py-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
                Page {currentPage} of {totalPages}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </>
        ) : (
          <div className="mx-24 mt-7 flex items-center flex-col">
            <h3 className='text-lg font-normal text-gray-700'>No internships found</h3>
          </div>
        )
      }
    </div>
  )
}

export default page
