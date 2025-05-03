"use client";
import { motion } from "framer-motion";

interface AnimatedDividerProps {
  color?: string;
}

const AnimatedDivider = ({ color = "primary" }: AnimatedDividerProps) => {
  const shapes = [
    { size: 8, left: "10%", delay: 0 },
    { size: 12, left: "30%", delay: 0.2 },
    { size: 16, left: "50%", delay: 0.4 },
    { size: 12, left: "70%", delay: 0.6 },
    { size: 8, left: "90%", delay: 0.8 },
  ];

  const getColorClass = (type: string) => {
    switch (color) {
      case "chart-1":
        return "bg-chart-1";
      case "chart-2":
        return "bg-chart-2";
      case "chart-3":
        return "bg-chart-3";
      case "chart-4":
        return "bg-chart-4";
      case "chart-5":
        return "bg-chart-5";
      default:
        return "bg-primary";
    }
  };

  return (
    <div className="relative h-16 w-full overflow-hidden">
      <motion.div
        className={`absolute top-1/2 left-0 right-0 h-[2px] ${getColorClass(
          ""
        )}/30`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={`absolute top-1/2 -translate-y-1/2 rounded-full ${getColorClass(
            ""
          )}`}
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.left,
          }}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: shape.delay,
            type: "spring",
            stiffness: 200,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedDivider;
