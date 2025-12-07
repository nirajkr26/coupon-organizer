import DeleteIcon from "../icons/DeleteIcon"
import EditIcon from "../icons/EditIcon"
import axios from "axios"
import { BASE_URL } from "../config/config"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"

const CouponCard = ({ _id, title, category, code, expiryDate, discount }) => {
    const { setCoupon } = useAuth()
    

    const deleteCoupon = async () => {
        try {
            const response = await axios.delete(BASE_URL + "/coupon/" + _id, {
                withCredentials: true
            })
            setCoupon(prev => prev.filter(item => item._id != _id))
            toast.success("Coupon Deleted")

        } catch (err) {
            toast.error("Something went wrong")
        }
    }

    const editCoupon = async ()=>{
        try{
            
        }catch(err){
            toast.error("Something went wrong")
        }
    }
    return (
        <div className='bg-white flex flex-col  gap-2 p-2 border border-red-300 rounded-md'>
            <div className='flex justify-between'><EditIcon /><span onClick={deleteCoupon}><DeleteIcon /></span></div>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
                <span>Title</span>
                <input type="text" readOnly value={title} className='bg-white border w-40 rounded-md border-gray-400 p-2' disabled />
            </label>
            <label className='flex gap-1 border border-gray-300 relative bg-white p-1  justify-between rounded-md items-center'>
                <span>Code</span>
                <input type="text" readOnly value={code} className='bg-white border w-40  rounded-md border-gray-400 p-2' disabled />

            </label>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
                <span>Discount</span>
                <input type="number" readOnly value={discount} className='bg-white border  w-40 rounded-md border-gray-400 p-2' disabled />
            </label>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
                <span>Category</span>
                <input type="text" readOnly value={category} className='bg-white border w-40  rounded-md border-gray-400 p-2' disabled />
            </label>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-md items-center'>
                <span>Expiry</span>
                <input type="text" readOnly value={new Date(expiryDate).toLocaleDateString()} className='bg-white w-40  border rounded-md border-gray-400 p-2' disabled />
            </label>

        </div>

    )
}

export default CouponCard