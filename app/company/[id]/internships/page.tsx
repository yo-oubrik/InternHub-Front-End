"use client";
import React, { useState } from 'react';
import Myinternship from '@/components/InternshipItem/MyInternship';
import { mockInternships } from '@/components/InternshipItem/MyInternshipsList';
import { DataTable } from '@/components/internships/DataTable';
import { CompanyInternshipsColumns } from '@/components/internships/CompanyInternshipsColumns';
import { Input } from '@/components/ui/input';

const page = () => {
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  const internships = mockInternships;

const columns = CompanyInternshipsColumns;

  return (
    <div className="py-10">
      <h3 className="header mb-4">Company Internships</h3>
      <div className="flex justify-end mb-4">
        <button
          className={`px-4 py-2 mr-2 ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('list')}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 ${viewMode === 'table' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setViewMode('table')}
        >
          Table View
        </button>
      </div>

      {viewMode === 'list' ? (
        <>
        <div className="flex items-center py-4">
            <Input
                placeholder="Filter Internship title..."
                className="max-w-sm"
            />
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {internships.map((internship) => (
            // <li key={internship.id} className="p-4 border rounded shadow">
            //   <h4 className="text-lg font-bold">{internship.title}</h4>
            //   <p>Applicants: {internship.applicants}</p>
            //   <p>Posted At: {internship.postedAt}</p>
            // </li>
            <Myinternship
              key={internship.id}
              internship={internship}
            />
          ))}
        </ul>
        </>
      ) : (
        <DataTable columns={columns} data={internships} />
      )}
    </div>
  );
};

export default page;
