import { useParams } from "next/navigation";
import { DataTable } from "@/components/Applications/application-table";
import { ColumnFiltersState } from "@tanstack/react-table";
import { useInternship } from "@/context/internshipContext";
import { StudentApplicationsColumns } from "./StudentApplicationsColumns";

interface StudentApplicationsProps {
  internshipTitle?: string;
}

const StudentApplications = ({ internshipTitle }: StudentApplicationsProps) => {
  const { applications } = useInternship();
  const columns = StudentApplicationsColumns;

  return (
    <div className="py-10 px-14">
      <h3 className="header mb-4">Recent Applications</h3>

      <DataTable
        columns={columns}
        data={applications}
        defaultInternship={internshipTitle}
        hiddenEmailInput={true}
      />
    </div>
  );
};

export default StudentApplications;