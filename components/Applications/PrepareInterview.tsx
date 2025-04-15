import React from "react";
import { DatePicker } from "@/components/DatePicker";

interface PrepareInterviewProps {
  interviewDate: string;
  setInterviewDate: (date: string) => void;
  interviewDescription: string;
  setInterviewDescription: (desc: string) => void;
}

const PrepareInterview: React.FC<PrepareInterviewProps> = ({
  interviewDate,
  setInterviewDate,
  interviewDescription,
  setInterviewDescription,
}) => {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label className="block mb-1 font-medium">Interview Date</label>
        <DatePicker value={interviewDate} setDateValue={setInterviewDate} className="w-full bg-white" />
      </div>
      <div>
        <label className="block mb-1 font-medium">Interview Description</label>
        <textarea
          className="w-full min-h-[30vh] rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          value={interviewDescription}
          onChange={e => setInterviewDescription(e.target.value)}
          placeholder="Enter interview details or informations..."
        />
      </div>
    </form>
  );
};

export default PrepareInterview;
