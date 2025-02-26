import WhyChooseClient, { Statistics } from "./WhyChooseClient";

export async function WhyChooseSection() {
    const statistics: Statistics = {
        internshipDomains: 0,
        internshipListings: 0,
        studentApplicants: 0,
        verifiedCompanies: 0
    };

    return <WhyChooseClient statistics={statistics} />;
}
