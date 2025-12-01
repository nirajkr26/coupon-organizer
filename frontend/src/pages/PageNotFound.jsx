import React from 'react'
import LogoIcon from '../icons/LogoIcon'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='h-screen bg-red-50'>
      <div onClick={()=> navigate("/")} className='flex gap-2 font-bold text-3xl items-center cursor-pointer justify-center p-4'><LogoIcon/> <p className=''>CUPPU</p></div>

      <div className='flex  text-red-500 flex-col items-center'>
        <p className='text-[100px] font-extrabold'>404</p>
        <p className='text-3xl font-semibold'>Page Not Found!</p>
        <button onClick={()=>navigate("/")} className='m-8 bg-blue-600 cursor-pointer hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-2xl '>Home</button>
      </div>
      
    </div>
  )
}

export default PageNotFound