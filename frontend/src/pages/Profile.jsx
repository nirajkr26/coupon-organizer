import React, { useEffect, useState } from 'react'
import EditIcon from '../icons/EditIcon'
import SaveIcon from '../icons/SaveIcon'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import { BASE_URL } from '../config/config'
import { toast } from "react-toastify"

const Profile = () => {
  const { user, setUser } = useAuth()
  const [edit, setEdit] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName)
  const [lastName, setLastName] = useState(user?.lastName)
  const email = user?.email

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
      console.log(response.data.data)
      setUser(response?.data?.data)
    } catch (err) {
      toast.error("Something went wrong")
    }
  }


  return (
    <div className='m-2 '>
      <p className='text-3xl font-semibold my-4'>Profile</p>
      <div className='flex flex-col gap-4 md:flex-row '>
        <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border-red-500 border-2'>
          <div className='flex justify-end'>
            <button onClick={() => {
              if (edit) { updateUser() }
              setEdit(!edit)
            }} className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-lg text-white px-4 py-1 rounded-md'>
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

        <div className='flex flex-col gap-2 bg-white p-4 rounded-lg border-red-500 border-2'>
          <div className='flex justify-end'>
            <button onClick={() => {
              if (edit) { updateUser() }
              setEdit(!edit)
            }} className='bg-blue-500 cursor-pointer hover:bg-blue-600 text-lg text-white px-4 py-1 rounded-md'>
              {edit ?
                <p className='flex gap-1 items-center justify-center'> <SaveIcon /> Save</p> :
                <p className='flex gap-1 items-center justify-center'> <EditIcon /> Edit</p>
              }
            </button>
          </div>
          <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
            <span>Old Pass</span>
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" placeholder='First Name' className='bg-white border rounded-md border-gray-400 p-2' />
          </label>
          <label className='flex gap-1 justify-between border border-gray-300 bg-white p-1 rounded-md items-center'>
            <span>New Pass</span>
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" placeholder='Last Name' className='bg-white border border-gray-400 rounded-md p-2' />
          </label>

        </div>
      </div>


    </div>
  )
}

export default Profile