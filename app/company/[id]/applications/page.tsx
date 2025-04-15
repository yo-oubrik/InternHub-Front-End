"use client";
import React, { useState } from 'react';
import { mockApplications } from '@/components/ApplicationsItem/ApplicationsList';
import { Input } from '@/components/ui/input';
import { CompanyApplicationsColumns } from '@/components/Applications/CompanyApplicationsColumns';
import { DataTable } from '@/components/Applications/application-table';

const page = () => {
  const [viewMode, setViewMode] = useState<'list' | 'table'>('list');

  const applications = mockApplications;

    const columns = CompanyApplicationsColumns;

  return (
    <div className="py-10">
      <h3 className="header mb-4">Company Applications</h3>
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
          {/* {applications.map((appli) => (
            // <li key={internship.id} className="p-4 border rounded shadow">
            //   <h4 className="text-lg font-bold">{internship.title}</h4>
            //   <p>Applicants: {internship.applicants}</p>
            //   <p>Posted At: {internship.postedAt}</p>
            // </li>
            // <Myinternship
            //   key={appli.id}
            //   application={appli}
            // />
          ))} */}
        </ul>
        </>
      ) : (
        <DataTable columns={columns} data={applications} />
      )}
    </div>
  );
};

export default page;
