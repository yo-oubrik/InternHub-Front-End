import FeatureCard from "@/Components/Cards/FeatureCard";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Briefcase, Building, CheckCircleIcon, Link, Users } from "lucide-react";

const features = [
    {
        icon: <Briefcase className="w-6 h-6 text-primary" />,
        title: "Diverse Opportunities",
        description:
            "Access thousands of job listings across various industries and experience levels.",
        benefits: [
            "100,000+ active job listings",
            "50+ job categories",
            "Remote and on-site options",
        ],
        cta: "Explore Jobs",
        ctaLink: "/findwork",
    },
    {
        icon: <Building className="w-6 h-6 text-primary" />,
        title: "Top Companies",
        description:
            "Connect with leading companies, from innovative startups to Fortune 500 corporations.",
        benefits: [
            "500+ verified employers",
            "Exclusive partnerships",
            "Direct application process",
        ],
        cta: "View Companies",
        ctaLink: "/findwork",
    },
    {
        icon: <Users className="w-6 h-6 text-primary" />,
        title: "Talent Pool",
        description:
            "Employers can access a diverse pool of qualified candidates for their open positions.",
        benefits: [
            "1M+ registered job seekers",
            "Advanced search filters",
            "AI-powered matching",
        ],
        cta: "Post a Job",
        ctaLink: "/post",
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
                    {features.map((feature, index) => (
                        <FeatureCard {...feature} key={index} />
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Badge
                        variant={"outline"}
                        className="text-sm font-medium border-gray-400"
                    >
                        Trusted by 10,000+ companies worldwide
                    </Badge>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseSection;