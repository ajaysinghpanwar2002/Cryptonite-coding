import HomePage from '@/components/Home/HomePage'
import PubCompanies from '@/components/PubCompanies/PubCompanies'
import React from 'react'

function page() {
  return (
    <div className='p-8'>
      <HomePage />
      <PubCompanies />
    </div>
  )
}

export default page