import WhyChooseClient, { Statistics } from "./WhyChooseClient";
import axios from "axios";

export async function WhyChooseSection() {
    // const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/statistics`);
    const statistics: Statistics = {
        // ...res.data
        internshipIndustries: 0,
        internshipListings: 0,
        studentApplicants: 0,
        verifiedCompanies: 0
    };

    return <WhyChooseClient statistics={statistics} />;
}
