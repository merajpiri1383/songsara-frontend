"use client"

import { useEffect, useMemo, useState } from "react";
import Loading from "../../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import API from "../../../../../src/api";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { changeAlbum } from "../../../../../src/reducers/album";

export default function Album() {


    const [showLoading, setShowLoading] = useState(true);
    const [album, setAlbum] = useState([]);
    const [moods, setMoods] = useState([]);
    const [artists, setArtists] = useState([]);
    const [genres, setGenres] = useState([]);
    const dispatch = useDispatch();
    const data = new FormData();
    const params = useParams();


    const getData = async () => {
        setShowLoading(true);
        await API.get(`/album/${params.slug}/`).then((response) => {
            setAlbum(response.data);
            setTimeout(() => setShowLoading(false), 300);
            dispatch(changeAlbum({
                artist : response.data.artist, 
                moods : response.data.moods , 
                genre : response.data.genre ,
                id : response.data.id ,
            }))
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        });
        console.log("call use memo")
        await API.get('/genre/').then((response) => setGenres(response.data)).catch((error) => error.response && error.response.status === 401 && getData());
        await API.get("/mood/").then((response) => setMoods(response.data)).catch((error) => error.response && error.response.status === 401 && getData());
        await API.get("/artist/").then((response) => setArtists(response.data)).catch((error) => error.response && error.response.status === 401 && getData());
    }
    useMemo(() => {
        getData();
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        await API.put(`/album/${params.slug}/`,data).then((response) => {
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status === 401 && submitHandeler();
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
                                onChange={(e) => data.append("moods", e.target.value)}
                            >
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
                            >
                                {
                                    artists.map((item, index) => {
                                        return (
                                            <option 
                                            value={item.id} 
                                            selected={album.artist.id === item.id && "selected"}
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
                                onChange={(e) => data.append("genre", e.target.value)}
                            >
                                {
                                    genres.map((genre, index) => {
                                        return (
                                            <option
                                                selected={album.genre.id === genre.id && "selected"}
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
                </Zoom>
            }
        </>
    )
};