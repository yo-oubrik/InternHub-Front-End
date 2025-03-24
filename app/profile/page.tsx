import CertificateCard from '@/components/Profile/CertificateCard'
import ExperienceCard from '@/components/Profile/ExperienceCard'
import FormationCard from '@/components/Profile/FormationCard'
import InfosCard from '@/components/Profile/InfosCard'
import PortfolioCard from '@/components/Profile/PortfolioCard'
import ProjectCard from '@/components/Profile/ProjectCard'
import React from 'react'

const page = () => {
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