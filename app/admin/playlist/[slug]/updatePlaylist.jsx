"use client"

import { useEffect, useState } from "react"
import Loading from "../../../components/loading"
import API from "../../../../src/api";
import { useDispatch } from "react-redux";
import { changeTogglePlaylist } from "../../../../src/reducers/toggle";
import { toast } from "react-toastify";

export default function UpdatePlaylist({ playlist, moods, genres }) {

    const [showLoading, setShowLoading] = useState(true);
    const data = new FormData();
    const dispatch = useDispatch();

    useEffect(() => {
        playlist && setTimeout(() => setShowLoading(false), 400);
    }, [playlist]);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.put(`/playlist/${playlist.slug}/`, data).then((response) => {
            dispatch(changeTogglePlaylist());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status && submitHandeler();
            error.response && toast.error(Object.values(error.response.data)[0][0])
            setTimeout(() => setShowLoading(false), 400);
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <form method="post" onSubmit={submitHandeler}>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">نام</p>
                        <input
                            placeholder={playlist.name}
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            type="text"
                            onChange={(e) => data.append("name", e.target.value)}
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">تصویر</p>
                        <input
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            type="file"
                            onChange={(e) => data.append("image", e.target.files[0])}
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">حس و حال</p>
                        <select
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            multiple
                            onChange={(e) => data.append("moods", e.target.value)}>
                            {
                                moods[0] && moods.map((mood, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={mood.id}>{mood.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">سبک</p>
                        <select
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            defaultValue={playlist && playlist.genre && playlist.genre.id}
                            onChange={(e) => data.append("genre", e.target.value)}>
                            {
                                genres[0] && genres.map((genre, index) => {
                                    return (
                                        <option
                                            key={index}
                                            value={genre.id}>{genre.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-1 py-3 text-lg text-white hover:bg-amber-500 bg-amber-300 rounded-md font-semibold"> ذخیره</button>
                </form>
            }
        </>
    )
};