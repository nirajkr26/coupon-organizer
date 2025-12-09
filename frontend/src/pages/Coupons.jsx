import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import CouponCard from '../components/CouponCard'
import FilterIcon from '../icons/FilterIcon'

const Coupons = () => {
  const { user, coupon } = useAuth()
  const searchRef = useRef();
  const timeoutRef = useRef();

  const [filtered, setFiltered] = useState(coupon);

  const handleSearch = () => {
    clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {

      const value = searchRef.current.value.toLowerCase().trim();
      const filteredValue = coupon.filter((c) => {
        return c.title.toLowerCase().includes(value);
      })

      setFiltered(filteredValue)
    }, 500)
  }

  useEffect(() => {
    setFiltered(coupon);
  }, [coupon]);

  return (
    <div className='p-4'>
      <div className='flex gap-4   '>

        <input placeholder='Search Coupons' ref={searchRef} onChange={handleSearch} className=' border-2 focus:border-slate-700 focus:ring-0 outline-none border-slate-700  bg-white p-3 text-lg rounded-lg my-2 w-full' />
        <button className='bg-slate-700 text-white py-3 px-5 my-2 text-lg rounded-lg flex gap-1 justify-center items-center cursor-pointer hover:bg-black  '><FilterIcon /> <p>Filter</p></button>
      </div>

      <div className='flex flex-wrap justify-around gap-4'>
        {filtered?.length > 0 && filtered.map((c) => (<CouponCard {...c} key={c._id} />))}
      </div>

    </div>
  )
}

export default Coupons