import InfosCard from '@/components/Profile/InfosCard'
import PortfolioCard from '@/components/Profile/PortfolioCard'
import React from 'react'

const page = () => {
  return (
    <div className='py-11 flex flex-col gap-5'>
        <PortfolioCard />
        <InfosCard />
    </div>
  )
}

export default page
