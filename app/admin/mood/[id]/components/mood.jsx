"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import API from "../../../../../src/api";
import { Zoom } from "react-awesome-reveal";
import Loading from "../../../../components/loading";

export default function Mood() {

    const [showLoading, setShowLoading] = useState(true);
    const [mood, setMood] = useState({});
    const formData = new FormData();
    const params = useParams();
    const router = useRouter();
    const getData = async () => {
        await API.get(`/mood/${params.id}/`).then((response) => {
            setMood(response.data)
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status == 401 && getData();
        })
    };


    useEffect(() => {
        getData();
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.put(`/mood/${params.id}/`, formData).then((response) => {
            setMood(response.data);
            setTimeout(() => setShowLoading(false), 300);
        }).catch((error) => {
            error.response && error.response.status == 401 && submitHandeler();
        })
    };

    const deleteHandeler = async (slug) => {
        await API.delete(`/mood/${slug}/`).then((response) => {
            router.push("/admin/mood/")
        }).catch((error) => {
            error.response && error.response.status == 401 && deleteHandeler(slug);
        })
    }

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <form method="post" className="col-span-3" onSubmit={submitHandeler}>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">نام</p>
                            <input
                                placeholder={mood.name}
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition"
                                type="text"
                                onChange={(e) => formData.append("name", e.target.value)}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">کد رنگ</p>
                            <input
                                placeholder= {mood.hex_color}
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition"
                                type="text"
                                onChange={(e) => formData.append("hex_color", e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full p-1 py-3 text-lg text-white bg-amber-300 hover:bg-amber-500 rounded-md font-semibold my-1"> ذخیره</button>
                        <button
                            type="button"
                            onClick={() => deleteHandeler(mood.slug)}
                            className="w-full p-1 py-3 text-lg text-white bg-rose-600 hover:bg-rose-700 rounded-md font-semibold my-1"> حذف</button>
                    </form>
                </Zoom>
            }
        </>
    )
};