"use client"
import { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import Loading from "../../../components/loading";
import API from "../../../../src/api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { changeToggle } from "../../../../src/reducers/mood";

export default function AddMood() {
    const [showLoading, setShowLoading] = useState(true);
    const formData = new FormData();
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => setShowLoading(false),400);
    },[])

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post("/mood/",formData).then((response) => {
            dispatch(changeToggle());
            setTimeout(() => setShowLoading(false),400); 
        }).catch((error) => {
            error.response && toast.error(error.response.data)
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <form method="post" onSubmit={submitHandeler}>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">نام</p>
                            <input
                                placeholder="نام حس حال را وارد کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition"
                                type="text"
                                required
                                onChange={(e) => formData.append("name",e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">تصویر</p>
                            <input
                                accept="image/jpg,png"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition"
                                type="file"
                                required
                                onChange={(e) => formData.append("image",e.target.files[0])}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-1 py-3 text-lg text-zinc-900 bg-amber-300 rounded-md font-semibold"> ذخیره</button>
                    </form>
                </Zoom>
            }
        </>
    )
};