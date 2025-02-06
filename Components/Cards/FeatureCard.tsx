"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import Button from "../Button";
import { useRouter } from "next/navigation";

interface FeatureCardProps {
    icon: JSX.Element;
    title: string;
    description: string;
    benefits: string[];
    cta: string;
    ctaLink: string;
}

const FeatureCard = ({ icon, title, description, benefits, cta, ctaLink }: FeatureCardProps) => {
    const router = useRouter();
    return (
        <Card className="flex flex-col h-full rounded-xl border-none shadow-md">
            <CardHeader>
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
                    {icon}
                </div>
                <CardTitle className="text-xl mb-2">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center">
                            <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </CardContent>
            <CardFooter>
                <Button label={cta} onClick={() => { router.push(ctaLink) }} />
            </CardFooter>
        </Card>
    );
};

export default FeatureCard;
