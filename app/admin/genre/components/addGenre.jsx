"use client"
import { useEffect, useState } from "react";
import Loading from "../../../components/loading";
import API from "../../../../src/api";
import { Zoom } from "react-awesome-reveal";
import { toast } from "react-toastify";
import {changeToggle } from "../../../../src/reducers/genre";
import { useDispatch } from "react-redux";

export default function AddGenre() {

    const [showLoading, setShowLoading] = useState(true);
    const [data,setData] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => setShowLoading(false) , 400);
    },[])

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post('/genre/',data).then((response) => {
            setTimeout(() => setShowLoading(false),400);
            dispatch(changeToggle());
            toast.success("سبک با موفقیت افزوده شد")
        }).catch((error) => {
            console.log(error);
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
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                required
                                onChange={(e) => setData({...data,name : e.target.value})}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">نام انگلیسی</p>
                            <input
                                placeholder="بدون فاصله وارد کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                required
                                onChange={(e) => setData({...data,slug : e.target.value})}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">توضیحات</p>
                            <textarea
                                placeholder="توضیحات مربوط به سبک"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                onChange={(e) => setData({...data,text : e.target.value})}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-1 py-3 text-lg text-white hover:bg-amber-500 bg-amber-300 rounded-md font-semibold"> ذخیره</button>
                    </form>
                </Zoom>
            }
        </>
    )
};