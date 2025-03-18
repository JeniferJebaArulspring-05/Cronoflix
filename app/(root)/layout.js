
"use client"


import Header from '@/components/Header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div className='bg-black w-full h-full text-white'>
        <Header/>
        {children}
    </div>
    
    
  )
}

export default layout