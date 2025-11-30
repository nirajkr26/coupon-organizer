import React from 'react'
import DeleteIcon from "../icons/DeleteIcon"
import EditIcon from "../icons/EditIcon"


const CouponCard = ({ title, category, code, expiryDate, discount }) => {

    return (
        <div className='bg-white w-40 flex flex-col  gap-2 p-2 border border-red-300 rounded-md'>
            <div className='flex justify-between'><EditIcon /><DeleteIcon /></div>
            <div className='font-semibold text-xl'>{title.toUpperCase()}</div>
            <div>{category}</div>
            <div>{code}</div>
            <div>{new Date(expiryDate).toLocaleDateString()}</div>
        </div>

    )
}

export default CouponCard