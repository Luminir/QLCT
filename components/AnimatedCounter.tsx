'use client'

import React from 'react'
import CountUp from 'react-countup';

const AnimatedCounter = ({amount}: {amount: number}) => {
  return (
    <div className='w-full'>
        <CountUp decimal="," end={amount}/> <p className=' inline-flex text-24 lg:text-30 font-semibold text-gray-900'>VND</p>
    </div>
  )
}

export default AnimatedCounter