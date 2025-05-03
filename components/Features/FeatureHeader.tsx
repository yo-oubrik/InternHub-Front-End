"use client";
import { motion } from "framer-motion";

interface FeatureHeaderProps {
  title: string;
  subtitle?: string;
}

const FeatureHeader = ({ title, subtitle }: FeatureHeaderProps) => {
  return (
    <motion.div
      className="text-center mb-16"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        {title}{" "}
        <span className="text-primary font-extrabold">InternHub</span>
      </h2>
      {subtitle && (
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default FeatureHeader;
