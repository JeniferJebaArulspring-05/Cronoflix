
import React from 'react'

const layout = ({ children }) => {
  return (
   <main className='w-full h-screen bg-custom p-5 flex justify-center items-center'>
        {children}
   </main>
    
  )
}

export default layout