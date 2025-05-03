"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();

  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Whether you're a student looking for an internship or a company
            seeking talented interns, InternHub is the perfect platform to
            connect and grow together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-8 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/internships")}
            >
              Sign up as a Student
            </motion.button>

            <motion.button
              className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-bold py-3 px-8 rounded-lg transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/post-internship")}
            >
              Sign up as a Company
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CallToAction;
