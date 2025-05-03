"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface PartnerImage {
  src: string;
  alt: string;
}

const InfinitePartnerSlider = () => {
  const partnerImages: PartnerImage[] = [
    { src: "/partners/amazon.png", alt: "Amazon" },
    { src: "/partners/google.png", alt: "Google" },
    { src: "/partners/meta.png", alt: "Meta" },
    { src: "/partners/microsoft.png", alt: "Microsoft" },
    { src: "/partners/oracle.png", alt: "Oracle" },
  ];

  // Duplicate the array to create a seamless loop
  const duplicatedImages = [
    ...partnerImages,
    ...partnerImages,
    ...partnerImages,
  ];

  return (
    <div className="py-28 bg-background-dark overflow-hidden border-b border-primary-light">
      <div className="container mx-auto px-4 mb-8">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-4xl font-bold mb-4">
            Our Trusted <span className="text-primary">Partners</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Join these leading companies that trust InternHub for connecting
            with talented students
          </p>
        </motion.div>
      </div>

      <div className="relative w-full mt-8">
        {/* First slider - left to right */}
        <motion.div
          className="flex items-center gap-16 py-4"
          animate={{ x: [-1920, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 25,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`slider1-${index}`}
              className="relative h-16 md:h-20 min-w-[150px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "contain" }}
                priority={index < 5}
              />
            </div>
          ))}
        </motion.div>

        {/* Second slider - right to left (opposite direction) */}
        <motion.div
          className="flex items-center gap-16 py-4 mt-4"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {duplicatedImages.reverse().map((image, index) => (
            <div
              key={`slider2-${index}`}
              className="relative h-16 md:h-20 min-w-[150px] flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "contain" }}
                priority={index < 5}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default InfinitePartnerSlider;
