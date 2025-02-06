import FeatureCard from "@/Components/Cards/FeatureCard";
import { Briefcase, Building, Users } from "lucide-react";

interface Statistics {
    internshipListings: number;
    internshipCategories: number;
    verifiedCompanies: number;
    studentApplicants: number;
}
const generateFeatures = ({ internshipListings, internshipCategories, verifiedCompanies, studentApplicants }: Statistics) => [
    {
        icon: <Briefcase className="w-6 h-6 text-primary" />,
        title: "Diverse Internship Opportunities",
        description:
            "Explore a wide range of internship listings across various industries.",
        benefits: [
            `${internshipListings.toLocaleString()}+ active internship listings`,
            `${internshipCategories}+ internship categories`,
            "Remote and on-site internships",
        ],
        actionLabel: "Browse Internships",
        actionLink: "/findinternships",
    },
    {
        icon: <Building className="w-6 h-6 text-primary" />,
        title: "Leading Moroccan Companies",
        description:
            "Connect with top Moroccan companies offering internships to bright students",
        benefits: [
            `${verifiedCompanies}+ trusted Moroccan companies`,
            "Exclusive internship opportunities",
            "Direct application process for internships",
        ],
        actionLabel: "View Companies",
        actionLink: "/findinternships",
    },
    {
        icon: <Users className="w-6 h-6 text-primary" />,
        title: "Talented Students Ready for Internships",
        description:
            "Access a diverse pool of Moroccan students graduates eager to start their professional",
        benefits: [
            `${studentApplicants.toLocaleString()}+ registered students`,
            "Advanced search filters to find the right match",
        ],
        actionLabel: "Post an Internship",
        actionLink: "/postinternship",
    },
];

const WhyChooseSection = () => {
    return (
        <section className="py-20 bg-[#f0f5fa]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose {" "}
                    <span className="text-primary font-extrabold">InternHub</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {generateFeatures({ internshipCategories: 0, internshipListings: 0, studentApplicants: 0, verifiedCompanies: 0 }).map((feature, index) => (
                        <FeatureCard {...feature} key={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;