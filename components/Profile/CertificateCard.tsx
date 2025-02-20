import React from 'react'
import CertificatContent from './CertificatContent'

const CertificateCard = () => {
    const certificats = [{
        title : "Machine Learning Specialization",
        img : "Certificates/Cisco_Networks.jpg",
        date : "2023"
    },{
        title : "CISCO",
        img : "Certificates/Cisco_Security.jpg",
        date : "2024"
    },]
  return (
    <div className='bg-gray-50 border-primary-hover shadow-sm rounded-lg py-6 px-5 w-[90%] mx-auto space-y-7'>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl text-gray-800 font-medium">Certificat</h2>
      </div>
      <div className="px-4 gap-6 grid grid-cols-4">
        {
            certificats.map(( certificat , index ) => (
                <CertificatContent key={index} {...certificat} />
            ))
        }
      </div>
    </div>
  )
}

export default CertificateCard
