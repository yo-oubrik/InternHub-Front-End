"use client";
import CertificateCard from '@/components/Profile/CertificateCard'
import ExperienceCard from '@/components/Profile/ExperienceCard'
import FormationCard from '@/components/Profile/FormationCard'
import InfosCard from '@/components/Profile/InfosCard'
import PortfolioCard from '@/components/Profile/PortfolioCard'
import ProjectCard from '@/components/Profile/ProjectCard'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { useUser } from '@/context/userContext';

const page = () => {
    const { id } = useParams();
    const { getStudent} = useUser();
    useEffect(() => {
      getStudent(id as string);
    }, []);
  return (
    <div className='py-11 flex flex-col gap-5'>
        <PortfolioCard />
        <InfosCard />
        <ExperienceCard />
        <FormationCard />
        <ProjectCard />
        <CertificateCard />
    </div>
  )
}

export default page;