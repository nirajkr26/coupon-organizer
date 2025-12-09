import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CouponCard from '../components/CouponCard'
import { CreateCoupon } from '../components/createCoupon'
import PlusIcon from "../icons/PlusIcon"


const Dashboard = () => {
  const { user, coupon } = useAuth()
  const [modalOpen, setModalOpen] = useState(false)
  const [expiring, setExpiring] = useState([]);

  const expiringCoupons = () => {
    const SEVEN_DAYS_IN_MS = 7 * 24 * 60 * 60 * 1000
    const now = Date.now()
    const expiringCoupons = []

    coupon.forEach(element => {
      const expiry = new Date(element.expiryDate).getTime()
      const diff = expiry - now;
      if (diff > 0 && diff <= SEVEN_DAYS_IN_MS) {
        expiringCoupons.push(element)
      }
    });
    setExpiring(expiringCoupons.slice(0, 3))
  }

  useEffect(() => {
    if (coupon && coupon.length > 0)
      expiringCoupons();

  }, [coupon])


  console.log(expiring)
  return (
    <div className='p-4'>
      <div className='flex justify-end items-start'>
        <button className=' bg-slate-700 text-white cursor-pointer hover:bg-black text-lg font-semibold py-3 px-5 rounded-md flex gap-1 justify-center items-center' onClick={() => setModalOpen(!modalOpen)}><PlusIcon /> Add Coupon</button>
      </div>

      <div className='font-bold text-4xl my-2'>Hi! {user?.firstName}</div>
      <div className='flex justify-evenly mb-4'>
        <div className='border-2 border-white flex flex-col gap-1 justify-center items-center p-4 rounded-lg bg-slate-800 text-white'>
          <p className='font-bold text-lg'>Total Coupons</p>
          <p className='px-4 py-1 rounded-md font-semibold  bg-white text-black'>{coupon.length}</p>
        </div>
        <div className='border-2 border-white flex flex-col gap-1 justify-center items-center p-4 rounded-lg bg-slate-800 text-white'>
          <p className='font-bold text-lg'>Expiring Coupons</p>
          <p className='px-4 py-1 rounded-md font-semibold  bg-white text-black'>{expiring.length}</p>
        </div>
      </div>

      <div className="text-red-600 font-semibold text-2xl my-4 border-t-2 border-slate-500  shadow-sm ring-green-700">Expiring Soon</div>
      <div className='flex flex-wrap gap-2 justify-evenly'>
        {expiring.length > 0 && expiring.map((c) => (<CouponCard key={c._id} {...c} />))}
      </div>

      <CreateCoupon open={modalOpen} onClose={() => setModalOpen(!modalOpen)} />


    </div>
  )
}

export default Dashboard