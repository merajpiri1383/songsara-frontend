"use client" 
import { useState , useEffect } from "react";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import API from "../../../../src/api";
import { changeToggleArtist } from "../../../../src/reducers/toggle";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function AddArtist () {

    const [showLoading,setShowLoading] = useState(true);
    const data = new FormData();
    const dispatch = useDispatch();
    useEffect(() => {
        setTimeout(() => setShowLoading(false),400);
    },[]);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post("/artist/",data).then((response) => {
            dispatch(changeToggleArtist());
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            error.response && error.response.data &&  setTimeout(() => setShowLoading(false),400);
            error.response && error.response.status == 401 && submitHandeler();
            error.response && error.response.data && toast.error(error.response.data[Object.keys(error.response.data)[0]][0]);
        })
    }

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
                                placeholder="نام هنرمند را وارد کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                required
                                onChange={(e) => data.append("name",e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">تصویر</p>
                            <input
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="file"
                                required
                                onChange={(e) => data.append("image",e.target.files[0])}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">عنوان</p>
                            <input
                                placeholder=" عنوان را وارد کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                accept="image/jpg,image/png,image/jpeg"
                                onChange={(e) => data.append("topic",e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">توضیحات</p>
                            <textarea
                                placeholder="توضیحات مربوط به هنرمند را وارد کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                type="text"
                                onChange={(e) => data.append("description",e.target.value)}
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