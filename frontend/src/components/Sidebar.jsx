
import { useNavigate } from 'react-router-dom'
import SidebarItem from "./SidebarItem"
import LogoIcon from "../icons/LogoIcon"
import LogoutIcon from "../icons/LogoutIcon"
import HomeIcon from "../icons/HomeIcon"
import ProfileIcon from "../icons/ProfileIcon"
import CouponIcon from "../icons/CouponIcon"
import { BASE_URL } from '../config/config'
import axios from "axios"
import { toast } from "react-toastify"
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'

const Sidebar = () => {
  const navigate = useNavigate();
  const { user, setCoupon, setUser } = useAuth()

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, {
        withCredentials: true,
      })

      toast.success("See you soon -" + user.firstName)
      navigate("/login")
    } catch (err) {
      toast.error("Something went wrong")
      console.error(err)
    }
  }

  const fetchCoupons = async () => {
    try {

      const response = await axios.get(BASE_URL + "/coupon", {
        withCredentials: true
      })
      setCoupon(response.data.data)
    } catch (err) {
      toast.error("Error fetching data")
    }
  }

  const fetchUser = async () => {
    try {

      const response = await axios.get(BASE_URL + "/verify", {
        withCredentials: true
      })

      if (response.status === 200) {
        setUser(response.data.data)
        fetchCoupons()
      }
    } catch (err) {
      if (err.response.data.message === "Please Login") {
        navigate("/login")
        toast.warning("Please Login")
      }
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  return (
    <div className='h-screen bg-slate-800 text-white border-r w-12 md:w-50 fixed left-0 top-0'>
      <div className='flex flex-col h-full items-center'>
        <div className='text-3xl cursor-pointer font-bold items-center gap-3 pt-4 flex' onClick={() => navigate("/dashboard")}>{<LogoIcon />}<p className='hidden md:block'>CUPPU</p></div>
        <div className='pt-4 text-center flex flex-col gap-3'>
          <SidebarItem text="Dashboard" onClick={() => navigate("/dashboard")} icon={<HomeIcon />} />
          <SidebarItem text="Coupons" onClick={() => navigate("/coupons")} icon={<CouponIcon />} />
        </div>
        <div className='text-center fixed flex flex-col gap-2 bottom-3'>
          <SidebarItem onClick={() => navigate("/profile")} text="Profile" icon={<ProfileIcon />} />
          <SidebarItem onClick={handleLogout} text="Logout" icon={<LogoutIcon />} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar