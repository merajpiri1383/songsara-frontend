"use client"

import { useEffect, useMemo, useState } from "react";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import API from "../../../../../src/api";
import { changeToggle } from "../../../../../src/reducers/album";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Album({ album }) {


    const [showLoading, setShowLoading] = useState(true);
    const [moods, setMoods] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const dispatch = useDispatch();
    const data = new FormData();
    const router = useRouter();


    const getData = async () => {
        await API.get('/genre/').then((response) => setGenres(response.data)).catch((error) => error.response && error.response.status === 401 && getData());
        await API.get("/mood/").then((response) => setMoods(response.data)).catch((error) => error.response && error.response.status === 401 && getData());
        await API.get("/artist/").then((response) => setArtists(response.data)).catch((error) => error.response && error.response.status === 401 && getData());
    }

    useEffect(() => {
        setShowLoading(false,400);
    },[]);

    useMemo(() => getData(), []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.put(`/album/${album.slug}/`, data).then((response) => {
            dispatch(changeToggle());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status === 401 && submitHandeler();
        })
    };

    const deleteHandeler = async (slug) => {
        await API.delete(`/album/${slug}/`).then((resposne) =>
            router.push("/admin/album/")).catch((e) =>
                e.response && e.response.status === 401 && deleteHandeler(slug))
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
                                placeholder={album.name}
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
                            <select multiple
                                placeholder="حس و حال را انتخاب کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                onChange={(e) => data.append("moods", e.target.value)}>
                                {
                                    moods.map((mood, index) => {
                                        return (
                                            <option
                                                value={mood.id}
                                                key={index}>{mood.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1"> هنرمند </p>
                            <select
                                placeholder="  هنرمند را انتخاب کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                onChange={(e) => data.append("artist", e.target.value)}
                                defaultValue={album && album.artist && album.artist.id}>
                                {
                                    artists.map((item, index) => {
                                        return (
                                            <option
                                                value={item.id}
                                                key={index}>{item.name}</option>
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
                                defaultValue={album && album.genre && album.genre.id}
                                onChange={(e) => data.append("genre", e.target.value)}>
                                {
                                    genres.map((genre, index) => {
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
                        <button
                            type="button"
                            onClick={() => deleteHandeler(album.slug)}
                            className="w-full p-1 py-3 text-lg my-2 text-white hover:bg-rose-600 bg-red-500 rounded-md font-semibold"> حذف</button>
                    </form>
                </Zoom>
            }
        </>
    )
};