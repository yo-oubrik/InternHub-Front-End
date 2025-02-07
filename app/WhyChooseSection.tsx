import WhyChooseClient, { Statistics } from "./WhyChooseClient";
import axios from "axios";

export async function WhyChooseSection() {
    const res = await axios.get(`${process.env.BASE_URL}/api/statistics`);
    const statistics: Statistics = {
        ...res.data
    };

    return <WhyChooseClient statistics={statistics} />;
}
