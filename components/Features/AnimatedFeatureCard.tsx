"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { useAuth } from "@/context/authContext";
import { motion } from "framer-motion";

interface AnimatedFeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  benefits: string[];
  actionLabel: string;
  actionLink: string;
  index: number;
}

const AnimatedFeatureCard = ({ 
  icon, 
  title, 
  description, 
  benefits, 
  actionLabel, 
  actionLink,
  index
}: AnimatedFeatureCardProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.2,
        ease: "easeOut" 
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.3 }
      }}
    >
      <Card className="flex flex-col h-full rounded-xl border-none shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <motion.div 
            className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4"
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.2 + 0.3,
              type: "spring",
              stiffness: 200
            }}
          >
            {icon}
          </motion.div>
          <CardTitle className="text-2xl mb-3">{title}</CardTitle>
          <CardDescription className="text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <ul className="space-y-3">
            {benefits.map((benefit, idx) => (
              <motion.li 
                key={idx} 
                className="flex items-start"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.3, 
                  delay: index * 0.1 + idx * 0.1 + 0.5
                }}
              >
                <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>{benefit}</span>
              </motion.li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Button 
              label={actionLabel} 
              onClick={() => {
                router.push(actionLink);
              }}
              className="w-full"
            />
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default AnimatedFeatureCard;
