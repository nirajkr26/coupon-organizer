import DeleteIcon from "../icons/DeleteIcon"
import EditIcon from "../icons/EditIcon"
import SaveIcon from "../icons/SaveIcon"
import axios from "axios"
import { BASE_URL } from "../config/config"
import { toast } from "react-toastify"
import { useAuth } from "../context/AuthContext"
import { useState } from "react"

const CouponCard = ({ _id, title, category, code, expiryDate, discount }) => {
    const { setCoupon } = useAuth()
    const [edit, setEdit] = useState(true);
    const [couponTitle, setCouponTitle] = useState(title)
    const [couponCode, setCouponCode] = useState(code);
    const [couponDiscount, setCouponDiscount] = useState(discount)

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

    const editCoupon = async () => {
        console.log(typeof (couponTitle))
        console.log(typeof (couponCode))
        console.log(typeof (couponDiscount))


        if (!couponTitle.trim() || !couponCode.trim() || couponDiscount === "") {
            toast.error("Fill all fields");
            return;
        }

        if (Number(couponDiscount) < 1 || Number(couponDiscount) > 100) {
            toast.error("Discount must be between 1-100")
            return;
        }


        try {
            const response = await axios.put(BASE_URL + "/coupon/" + _id, {
                title: couponTitle,
                code: couponCode,
                discount: couponDiscount
            }, {
                withCredentials: true
            })

            setCouponTitle(response.data.data.title)
            setCouponCode(response.data.data.code)
            setCouponDiscount(response.data.data.discount)

            toast.success("Coupon updated successfully")

            setEdit(true)
        } catch (err) {
            toast.error("Something went wrong")
        }
    }

    return (
        <div className='bg-slate-700 shadow-md shadow-slate-800 hover:bg-slate-900 ring-2 ring-blue-800 flex flex-col w-96 gap-2 p-4 rounded-xl'>
            <div className='flex text-white justify-between'>
                <span onClick={() => {
                    if (edit) { setEdit(false) }
                    else { editCoupon() }
                }}>
                    {edit ? <EditIcon /> : <SaveIcon />}
                </span>
                <span onClick={deleteCoupon} className="rounded-full p-1 bg-red-500 " ><DeleteIcon /></span></div>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-lg items-center'>
                <span>Title</span>
                <input type="text" value={couponTitle} onChange={(e) => setCouponTitle(e.target.value)} className='bg-white border w-40 rounded-lg border-gray-400 p-2' disabled={edit} />
            </label>
            <label className='flex gap-1 border border-gray-300 relative bg-white p-1  justify-between rounded-lg items-center'>
                <span>Code</span>
                <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} className='bg-white border w-40  rounded-lg border-gray-400 p-2' disabled={edit} />

            </label>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-lg items-center'>
                <span>Discount</span>
                <input type="number" min={1} max={100} value={couponDiscount} onChange={(e) => {
                    const value = e.target.value;
                    setCouponDiscount(value === "" ? "" : Number(value));
                }} className='bg-white border  w-40 rounded-lg border-gray-400 p-2' disabled={edit} />
            </label>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-lg items-center'>
                <span>Category</span>
                <input type="text" readOnly value={category} className='bg-white border w-40  rounded-lg border-gray-400 p-2' disabled />
            </label>
            <label className='flex gap-1 border border-gray-300 bg-white p-1  justify-between rounded-lg items-center'>
                <span>Expiry</span>
                <input type="text" readOnly value={new Date(expiryDate).toLocaleDateString()} className='bg-white w-40  border rounded-lg border-gray-400 p-2' disabled />
            </label>

        </div>

    )
}

export default CouponCard