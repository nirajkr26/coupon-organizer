import CutIcon from "../icons/CutIcon"
import Input from "./Input"
import Select from "./Select";
import SaveIcon from "../icons/SaveIcon"


export const CreateCoupon = ({ open, onClose }) => {
    const today = new Date().toISOString().split("T")[0];

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
                            <Input type="text" placeholder="Title" />
                            <Input type="text" placeholder="Code" />
                            <Input type="Number" placeholder="Discount" customProps={{
                                min: "1"
                            }} />

                            <Select placeholder="Select Category" options={["Food", "Travel", "Electronics", "Hotels", "Clothes", "Others"]} />

                            <Input type="date" placeholder="Date" customProps={{ min: today }} />

                        </div>
                        <button className="bg-red-500 text-white w-full p-2 mt-3 rounded-md hover:bg-red-600 cursor-pointer text-lg font-semibold flex justify-center items-center gap-1"> <SaveIcon />SAVE</button>
                    </span>
                </div>
            </div>}
        </div>
    )
}