import HomePage from '@/components/Home/HomePage'
import PubCompanies from '@/components/PubCompanies/PubCompanies'
import React from 'react'
import { getStaticDataThreeCoins } from '@/components/utils/getStaticData'

function page() {
  const data = getStaticDataThreeCoins();

  return (
    <div className='p-8'>
      <HomePage FirstReloadConstantDataForThreeCoins={data}  />
      <PubCompanies />
    </div>
  )
}

export default page