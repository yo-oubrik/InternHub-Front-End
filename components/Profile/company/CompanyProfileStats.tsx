"use client";

import { useEffect, useState, useMemo } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BarChart3, ChevronRight, Router, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useRouter } from 'next/navigation';

interface CompanyProfileStatsProps {
  internships: number;
  applicants: number;
}

const CompanyProfileStats = ({ internships, applicants }: CompanyProfileStatsProps) => {
  const router = useRouter() ;
  const [currentInternships, setCurrentInternships] = useState(0);
  const [currentApplicants, setCurrentApplicants] = useState(0);
  const [animatedValue, setAnimatedValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true });
  const internshipsAnimationSpeed = internships + 1;
  const applicantsAnimationSpeed = internships / applicants + 1;

  // Memoize the animation function since it's used multiple times
  const animateDigits = useMemo(() => {
    return (number: number) => {
      return number
        .toString()
        .split('')
        .map((digit, index) => (
          <motion.span
            key={index}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.01 }}
            className="inline-block"
          >
            {digit}
          </motion.span>
        ));
    };
  }, []);

  useEffect(() => {
    const internshipsInterval = setInterval(() => {
      if (currentInternships < internships) {
        setCurrentInternships((prev) => Math.min(prev + 1, internships));
      }
    }, internshipsAnimationSpeed);

    const applicantsInterval = setInterval(() => {
      if (currentApplicants < applicants) {
        setCurrentApplicants((prev) => Math.min(prev + 1, applicants));
      }
    }, applicantsAnimationSpeed);

    return () => {
      clearInterval(internshipsInterval);
      clearInterval(applicantsInterval);
    };
  }, [internships, applicants, currentInternships, currentApplicants]);

  const ratio = applicants > 0 ? (internships / applicants) * 100 : 0;

  useEffect(() => {
    const animation = setInterval(() => {
      setAnimatedValue((prev) => {
        if (prev >= ratio) {
          clearInterval(animation);
          return ratio;
        }
        return prev + 0.01;
      });
    }, 10);

    return () => clearInterval(animation);
  }, [ratio]);

  // Memoize the rendered digits to prevent unnecessary re-renders
  const renderedInternships = useMemo(() => {
    return animateDigits(currentInternships);
  }, [currentInternships, animateDigits]);

  const renderedApplicants = useMemo(() => {
    return animateDigits(currentApplicants);
  }, [currentApplicants, animateDigits]);

  return (
    <div className="bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[30%] space-y-4">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <BarChart3 className="w-6 h-6 text-blue-500" />
          <div className='relative'>
            <h3 className="text-lg font-medium flex items-center">Total Internships</h3>
            <div className='flex text-sm text-primary items-center justify-end absolute -right-2' onClick={() => router.push(`internships/company/1`) }>
              <p>List of Internships</p>
              <ChevronRight size={20} />
            </div>
          </div>
        </div>
        <div className="text-3xl overflow-hidden font-bold text-blue-500">
          {renderedInternships}
        </div>

      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <UserPlus className="w-6 h-6 text-green-500" />
          <div className='relative'>
            <h3 className="text-lg font-medium">Total Applicants</h3>
            <div className='flex text-sm text-primary items-center justify-end absolute -right-2' onClick={() => router.push(`applications/company/1`)}>
                <p>List of Applications</p>
                <ChevronRight size={20} />
              </div>
          </div>
        </div>
        <div className="text-3xl overflow-hidden font-bold text-green-500">
          {renderedApplicants}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4 flex justify-center">Internships to Applicants Ratio</h3>
        <div className="w-24 h-24 mx-auto">
          <motion.div
            transition={{ duration: 2 }}
          > 
            <CircularProgressbar
              value={animatedValue}
              text={`${animatedValue.toFixed(2)}%`}
              styles={buildStyles({
                textColor: '#4A5568',
                pathColor: '#3182CE',
                trailColor: '#E2E8F0',
              })}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileStats;
