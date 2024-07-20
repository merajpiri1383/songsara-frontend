"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react"
import API from "../../../../../src/api";
import { Zoom } from "react-awesome-reveal";
import Loading from "../../../../components/loading";

export default function Mood() {

    const [showLoading, setShowLoading] = useState(true);
    const [mood, setMood] = useState({});
    const formData = new FormData();
    const params = useParams();


    useEffect(() => {
        (async () => {
            await API.get(`/mood/${params.id}/`).then((response) => {
                setMood(response.data)
                setTimeout(() => setShowLoading(false),400);
            }).catch((error) => {
                console.log(error)
            })
        })();
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault() ;
        await API.put(`/mood/${params.id}/`,formData).then((response) => {
            setMood(response.data);
            setTimeout(() => setShowLoading(false),300);
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <div className="grid grid-cols-5 gap-3">
                        <form method="post" className="col-span-3" onSubmit={submitHandeler}>
                            <div className="my-2">
                                <p className="text-gray-300 text-right my-1">نام</p>
                                <input
                                    placeholder={mood.name}
                                    className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition"
                                    type="text"
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
                                    onChange={(e) => formData.append("image",e.target.files[0])}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full p-1 py-3 text-lg text-zinc-900 bg-amber-300 rounded-md font-semibold"> ذخیره</button>
                        </form>
                        <div className="col-span-2 p-3">
                            <img
                                src={mood.image}
                                alt={mood.name}
                                className="h-full rounded-lg"
                            />
                        </div>
                    </div>
                </Zoom>
            }
        </>
    )
};