import React from 'react'
import { useAuth } from '../context/AuthContext'
import CouponCard from '../components/CouponCard'

const Dashboard = () => {
  const { user, coupon } = useAuth()
  return (
    <div className='p-4'>
      <div className='font-bold text-4xl'>Hi! {user?.firstName}</div>
      {
        console.log(coupon)
      }
      <div className='flex flex-wrap'>
        {coupon?.length > 0 && coupon.map((c)=>(<CouponCard {...c} key={c._id} />))}
      </div>
      
    </div>
  )
}

export default Dashboard