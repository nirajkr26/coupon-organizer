import React from 'react'

const SidebarItem = ({text, icon, onClick}) => {
  return (
    <div onClick={onClick} className='flex gap-3 cursor-pointer py-1 px-2 rounded-md items-center text-gray-800 max-w-35 hover:bg-red-100 transition-all'>
        {icon} <p className='hidden md:block'>{text}</p>
    </div>
  )
}

export default SidebarItem