"use client"

import { useEffect, useMemo, useState } from "react";
import Loading from '../../../components/loading';
import { Fade } from "react-awesome-reveal";
import { useDispatch } from "react-redux";
import { changeToggle } from "../../../../src/reducers/album";
import API from "../../../../src/api";
import { toast } from "react-toastify";

export default function AddAlbum() {

    const [showLoading, setShowLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [artist,setArtist] = useState([]);
    const data = new FormData();
    const dispatch = useDispatch();
    const [moods, setMoods] = useState([]);

    
    const getData = async (cancelAPI) => {
        await API.get('/artist/',{signal : cancelAPI.signal}).then((response) => {
            setArtist(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get('/mood/',{signal : cancelAPI.signal}).then((response) => {
            setMoods(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());

        await API.get("/genre/",{signal : cancelAPI.signal}).then((response) => {
            setGenres(response.data);
        }).catch((error) => error.response && error.response.status === 401 && getData());
    };

    useEffect (() => {
        const cancelAPI = new AbortController();
        getData(cancelAPI);
        return () => cancelAPI.abort();
    } ,[]);

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.post('/album/',data).then((response) => {
            dispatch(changeToggle());
            setTimeout(() => setShowLoading(false),400);
        }).catch((error) => {
            error.response && toast.error(Object.values(error.response.data)[0][0]);
            error.response && error.response.status === 401 && submitHandeler();
        })
    };

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Fade duration={300}>
                    <form method="post" onSubmit={submitHandeler}>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">نام</p>
                            <input
                                placeholder="نام آلبوم را وارد کنید"
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
                                required
                                onChange={(e) => data.append("image", e.target.files[0])}
                            />
                        </div>
                        <div className="my-2">
                            <p className="text-gray-300 text-right my-1">حس و حال</p>
                            <select multiple
                                placeholder="حس و حال را انتخاب کنید"
                                className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                                focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                                onChange={(e) => data.append("moods", e.target.value)}
                            >
                                {
                                    moods.map((mood, index) => {
                                        return (
                                            <option value={mood.id} key={index}>{mood.name}</option>
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
                            >
                                {
                                    artist.map((item, index) => {
                                        return (
                                            <option value={item.id} key={index}>{item.name}</option>
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
                            >
                                {
                                    genres.map((genre, index) => {
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
                </Fade>
            }
        </>
    )
};