"use client"

import { useEffect, useMemo, useState } from "react";
import Loading from "../../../components/loading";
import API from "../../../../src/api";
import { changeToggleTrack } from "../../../../src/reducers/track";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function CreateMusic() {

    const [showLoading, setShowLoading] = useState(true);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const dispatch = useDispatch();
    const data = new FormData();

    const getData = async () => {
        await API.get("/artist/").then((response) => {
            setArtists(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get("/genre/").then((response) => {
            setGenres(response.data)
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };


    useMemo(() => getData(), []);
    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post("/track/", data).then((response) => {
            dispatch(changeToggleTrack());
        }).catch((error) => {
            error.response && error.response.status === 401 && submitHandeler();
            error.response && error.response.status !== 401 && toast.error(Object.values(error.response.data)[0][0]);
        }).finally(() => setTimeout(() => setShowLoading(false),400));
    }

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <form method="post" onSubmit={submitHandeler} className="my-6">
                    <h2 className="text-right text-amber-400 text-lg font-semibold">افزودن فایل</h2>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">نام</p>
                        <input
                            placeholder="نام فایل را وارد کنید"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            type="text"
                            required
                            onChange={(e) => data.append("name", e.target.value)}
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">تصویر</p>
                        <input
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            type="file"
                            accept="image/*"
                            required
                            onChange={(e) => data.append("image", e.target.files[0])}
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">فایل</p>
                        <input
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            type="file"
                            accept="audio/*"
                            required
                            onChange={(e) => data.append("file", e.target.files[0])}
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">هنرمند</p>
                        <select
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            onChange={(e) => data.append("artist", e.target.value)}
                            required>
                                <option>هنرمند را انتخاب کنید</option>
                            {
                                artists[0] && artists.map((artist, index) => {
                                    return (
                                        <option key={index} value={artist.id}>{artist.name}</option>
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
                            onChange={(e) => data.append("genre", e.target.value)}
                            required>
                                <option>سبک را انتخاب کنید</option>
                            {
                                genres[0] && genres.map((genre, index) => {
                                    return (
                                        <option key={index} value={genre.id}>{genre.name}</option>
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