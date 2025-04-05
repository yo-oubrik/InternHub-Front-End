"use client";

import React from 'react';
import { useState } from 'react';
import { useUser } from '@/context/userContext';

interface FlagCompanyProps {
  companyId: string;
  companyName: string;
}

const FlagCompany = ({ companyId, companyName }: FlagCompanyProps) => {
  const [flagReason, setFlagReason] = useState<string>('');
  const { student } = useUser();

  // const handleFlag = async () => {
  //   if (!flagReason) {
  //     alert('Please provide a reason for flagging');
  //     return;
  //   }

  //   try {
  //     // Here you would implement the actual flagging logic
  //     console.log('Flagging company:', {
  //       companyId,
  //       companyName,
  //       reason: flagReason,
  //       studentId: student?.id,
  //     });

  //     // Show success message
  //     alert('Company has been flagged successfully');
  //   } catch (error) {
  //     console.error('Error flagging company:', error);
  //     alert('Failed to flag company. Please try again.');
  //   }
  // };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">Flag Company</h2>
        <p className="text-gray-600">You are about to flag {companyName}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Flagging
          </label>
          <textarea
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            placeholder="Please provide specific details about why you are flagging this company..."
          />
        </div>

        <div className="bg-yellow-50 p-4 rounded-md">
          <h3 className="text-yellow-800 font-medium mb-2">Important Information</h3>
          <ul className="list-disc list-inside text-yellow-700">
            <li>
              <strong>Flag Severity:</strong>
              <ul className="ml-4 list-disc list-inside text-yellow-700">
                <li><strong>Low:</strong> Minor issues or concerns</li>
                <li><strong>Medium:</strong> Serious issues affecting multiple users</li>
                <li><strong>High:</strong> Critical issues requiring immediate attention</li>
              </ul>
            </li>
            <li>You can flag up to 3 companies per month</li>
            <li>
              Repeatedly flagging legitimate companies may result in your account being flagged
            </li>
            <li>
              Please provide specific details that can help us investigate your concern
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlagCompany;
