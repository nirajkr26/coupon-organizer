import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CouponCard from '../components/CouponCard'
import { CreateCoupon } from '../components/createCoupon'
import PlusIcon from "../icons/PlusIcon"


const Dashboard = () => {
  const { user, coupon } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className='p-4'>
      <div className='flex justify-end items-start'>
        <button className=' bg-red-500 text-white cursor-pointer hover:bg-red-600 text-lg font-semibold p-2 rounded-md flex gap-1 justify-center items-center' onClick={() => setModalOpen(!modalOpen)}><PlusIcon /> Add Coupon</button>
      </div>
      <div className='font-bold text-4xl'>Hi! {user?.firstName}</div>

      <CreateCoupon open={modalOpen} onClose={() => setModalOpen(!modalOpen)} />


    </div>
  )
}

export default Dashboard