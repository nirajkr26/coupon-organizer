import React, { useEffect, useState } from 'react'
import EditIcon from '../icons/EditIcon'
import SaveIcon from '../icons/SaveIcon'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { BASE_URL } from '../config/config'
import { toast } from "react-toastify"
import { usePasswordValidation } from '../hooks/usePasswordValidation'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from "../icons/DeleteIcon"

const Profile = () => {
  const { user, setUser } = useAuth()
  const [edit, setEdit] = useState(false)
  const [editPass, setEditPass] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const email = user?.email
  const [oldPass, setOldPass] = useState("")
  const { password, setPassword, validation } = usePasswordValidation()
  const showValidation = password.length >= 1
  const [del, setDel] = useState(false)
  const [confirmText, setConfirmText] = useState("")

  const navigate = useNavigate()

  const updateUser = async () => {
    try {
      if (!firstName || !lastName) {
        toast.error("Enter all details")
        return;
      }
      if (firstName == user.firstName && lastName == user.lastName) {
        return;
      }

      const response = await axios.post(BASE_URL + "/profile/update", {
        firstName, lastName
      }, { withCredentials: true })
      toast.success("Details updated")
      setUser(response?.data?.data)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  const updatePassword = async () => {
    if (!oldPass || !password) {
      toast.error("Both Password fields are required")
      return;
    }
    if (oldPass == password) {
      toast.error("Passwords should be different")
      setOldPass("")
      setPassword("")
      return;
    }

    if (Object.values(validation).includes(false)) {
      toast.warning("Please enter a strong password!")
      return;
    }

    try {

      const response = await axios.post(BASE_URL + "/profile/password", {
        password: oldPass,
        newPassword: password
      }, { withCredentials: true })

      toast.success("Password updated successfully")
      const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      navigate("/login")

    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  const handleDelete = async () => {
    if (!confirmText) {
      toast.error("Enter confirmation")
      return;
    }

    if (email != confirmText.trim()) {
      toast.error("Email did not match")
      return;
    }

    try {
      const response = await axios.delete(BASE_URL + "/profile/delete", { withCredentials: true })

      const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
      navigate("/login")
      toast.success("Account Deleted")
    } catch (err) {
      toast.error("Something went wrong")
    }
  }

  return (
    <div className='p-2'>
      <p className='text-3xl font-semibold my-4'>Profile</p>
      <div className='flex flex-col  gap-2  '>
        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <div className='flex flex-col gap-2 bg-white md:w-1/2 p-4 rounded-lg border-slate-800 border-2'>
            <div className='flex justify-end'>
              <button onClick={() => {
                if (edit) { updateUser() }
                setEdit(!edit)
              }} className='bg-slate-700 cursor-pointer hover:bg-black text-lg text-white px-4 py-1 rounded-md'>
                {edit ?
                  <p className='flex gap-1 items-center justify-center'> <SaveIcon /> Save</p> :
                  <p className='flex gap-1 items-center justify-center'> <EditIcon /> Edit</p>
                }
              </button>
            </div>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
              <span>First Name</span>
              <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First Name' className='bg-white border rounded-md border-gray-400 p-2' disabled={!edit} />
            </label>
            <label className='flex gap-1 justify-between border border-gray-300 bg-white p-1 rounded-md items-center'>
              <span>Last Name</span>
              <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last Name' className='bg-white border border-gray-400 rounded-md p-2' disabled={!edit} />
            </label>
            <label className='flex gap-1 border border-gray-300 bg-white justify-between p-1 rounded-md items-center'>
              <span>Email</span>
              <input value={email} type="text" placeholder='Email' className='bg-white border border-gray-400 rounded-md p-2' disabled />
            </label>


          </div>

          <div className='flex flex-col gap-2 bg-white md:w-1/2 p-4 rounded-lg border-slate-800 border-2'>
            <div className='flex justify-end'>
              <button onClick={() => {
                if (editPass) { updatePassword() }
                if (!editPass) setEditPass(!editPass)
              }} className='bg-slate-700 cursor-pointer hover:bg-black text-lg text-white px-4 py-1 rounded-md'>
                {editPass ?
                  <p className='flex gap-1 items-center justify-center'> <SaveIcon /> Save</p> :
                  <p className='flex gap-1 items-center justify-center'> <EditIcon /> Edit</p>
                }
              </button>
            </div>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
              <span>Old Pass</span>
              <input value={oldPass} onChange={(e) => setOldPass(e.target.value)} type="password" placeholder='Old Password' className='bg-white border rounded-md border-gray-400 p-2' disabled={!editPass} />
            </label>
            <label className='flex gap-1 justify-between border border-gray-300 bg-white p-1 rounded-md items-center'>
              <span>New Pass</span>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder='New Password' className='bg-white border border-gray-400 rounded-md p-2' disabled={!editPass} />
            </label>
            {showValidation && <div className='text-sm text-center'>
              <p className={validation.upper ? "text-green-600" : "text-red-600"}>• Contains uppercase</p>
              <p className={validation.lower ? "text-green-600" : "text-red-600"}>
                • Contains lowercase
              </p>
              <p className={validation.number ? "text-green-600" : "text-red-600"}>
                • Contains number
              </p>
              <p className={validation.length ? "text-green-600" : "text-red-600"}>
                • Minimum 8 characters
              </p>
            </div>
            }
          </div>
        </div>
        <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border-slate-800 border-2'>
          <button onClick={() => { setDel(!del); setConfirmText("") }} className={`${del ? "bg-slate-700 hover:bg-black" : "bg-red-500 hover:bg-red-600"} 
            p-1 text-white rounded-md text-lg cursor-pointer 
            flex gap-1 items-center justify-center`}>{del ? <>Cancel</> : <><DeleteIcon /> Delete Account</>}</button>
          {del &&
            <>
              <input value={confirmText} onChange={(e) => setConfirmText(e.target.value)} type="text" placeholder='Email' className='bg-white border rounded-md border-gray-400 p-2' />
              <p className='text-center text-slate-700 font-mono'>Enter your Email for confirmation</p>

              <button onClick={handleDelete} className='cursor-pointer bg-red-500 p-1 rounded-md text-lg text-white '>Confirm</button>
            </>}
        </div>
      </div>

      <div>

      </div>

    </div>
  )
}

export default Profile