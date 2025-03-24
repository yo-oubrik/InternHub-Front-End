import WhyChooseClient, { Statistics } from "./WhyChooseClient";

export async function WhyChooseSection() {
  const statistics: Statistics = {
    internshipListings: 0,
    remoteInternships: 0,
    onSiteInternships: 0,
    studentApplicants: 0,
    verifiedCompanies: 0,
  };

  return <WhyChooseClient statistics={statistics} />;
}
