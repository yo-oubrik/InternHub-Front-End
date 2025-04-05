import { useUser } from '@/context/userContext';
import React, { useState } from 'react'
import InputField from '../InputField';

interface ApplicationProcessProps {
    setCV : (file : File) => void;
    setMotivationLetter : (file : File) => void;
}

const ApplicationProcess = ({setCV , setMotivationLetter} : ApplicationProcessProps) => {
    const { student , setStudent } = useUser();
  return (
    <div>
        <div className="grid gap-4">
          <div>
            <label
              htmlFor="cv"
              className="block text-sm font-medium text-gray-700"
            >
              CV * :
            </label>
            <div className="mt-1">
              <InputField
                type="file"
                className="w-full"
                required
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setCV(file);
                    setStudent({
                      ...student,
                      links: {
                        ...student?.links,
                        cv: file.name
                      }
                    });
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="motivationLetter"
              className="block text-sm font-medium text-gray-700"
            >
              Motivation letter :
            </label>
            <div className="mt-1">
              <InputField
                type="file"
                className="w-full"
                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setMotivationLetter(file);
                    setStudent({
                      ...student,
                      links: {
                        ...student?.links,
                        motivationLetter: file.name
                      }
                    });
                  }
                }}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default ApplicationProcess
