import CutIcon from "../icons/CutIcon"
import Input from "./Input"
import Select from "./Select";
import SaveIcon from "../icons/SaveIcon"
import { useRef } from "react";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export const CreateCoupon = ({ open, onClose }) => {
    const today = new Date().toISOString().split("T")[0];

    const { coupon, setCoupon } = useAuth()

    const titleRef = useRef(null)
    const codeRef = useRef(null)
    const discountRef = useRef(null)
    const expiryRef = useRef(null)
    const categoryRef = useRef(null)

    const addCoupon = async () => {
        const title = titleRef.current?.value.trim()
        const code = codeRef.current?.value.trim()
        const discount = discountRef?.current.value.trim()
        const expiryDate = expiryRef?.current.value.trim()
        const category = categoryRef?.current.value.trim()

        if (!title || !code || !discount || !expiryDate || !category) {
            toast.error("Fill all details")
            return;
        }

        try {
            const couponData = { title, code, category, discount, expiryDate }


            const response = await axios.post(BASE_URL + "/coupon", couponData, {
                withCredentials: true
            })

            const newCoupon = response.data.data

            if (setCoupon && newCoupon) {
                const currentCoupons = Array.isArray(coupon) ? coupon : [];
                setCoupon([...currentCoupons, newCoupon])
            }
            toast.success("Coupon Added")

            onClose()
        } catch (err) {
                console.log(err)
                const errorMessage = err?.response?.data?.message || err.message
                toast.error(errorMessage)
            
        }
    }

    return (
        <div>
            {open && <div className="h-screen w-screen bg-red-900/25 fixed top-0 left-0 flex transition-all justify-center">
                <div className="flex flex-col justify-center">
                    <span className="bg-white p-4 rounded-md">

                        <div className="flex justify-end cursor-pointer mb-2">
                            <div onClick={onClose}>
                                <CutIcon />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input reference={titleRef} type="text" placeholder="Title" />
                            <Input reference={codeRef} type="text" placeholder="Code" />
                            <Input reference={discountRef} type="Number" placeholder="Discount" customProps={{
                                min: "1"
                            }} />

                            <Select reference={categoryRef} options={["Food", "Travel", "Electronics", "Hotels", "Clothes", "Others"]} />

                            <Input reference={expiryRef} type="date" placeholder="Date" customProps={{ min: today }} />

                        </div>
                        <button onClick={addCoupon} className="bg-red-500 text-white w-full p-2 mt-3 rounded-md hover:bg-red-600 cursor-pointer text-lg font-semibold flex justify-center items-center gap-1"> <SaveIcon />SAVE</button>
                    </span>
                </div>
            </div>}
        </div>
    )
}