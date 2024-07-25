"use client"
import { useEffect, useMemo, useState } from "react"
import Loading from "../../../components/loading";
import API from "../../../../src/api";
import { toast } from "react-toastify";
import { changeTogglePlaylist } from "../../../../src/reducers/toggle";
import { useDispatch } from "react-redux";


export default function CreateTrack({playlist}) {
    const [showLoading, setShowLoading] = useState(true);
    const data = new FormData();
    const [artists,setArtists] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        await API.get("/artist/").then((response) => setArtists(response.data)).catch((e) => e.response && e.response.status === 401 && getData());
    }

    useEffect(() => {
        setTimeout(() => setShowLoading(false), 400);
    }, []);

    const submitHandeler = async (e) => {
        setShowLoading(true);
        e.preventDefault();
        data.append("genre",playlist.genre.id);
        data.append("playlist",playlist.id);
        await API.post("/track/",data).then((response) => {
            dispatch(changeTogglePlaylist());
            toast.success("فایل افزوده شد")
        }).catch((error) => {
            error.response && error.response.status === 401 && submitHandeler();
            error.response && toast.error(Object.values(error.response.data)[0][0]);
        }).finally(() => setTimeout(() => setShowLoading(false) ,400))
    };

    useMemo(() => getData(),[]);

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
                        <p className="text-gray-300 text-right my-1">فایل</p>
                        <input
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            type="file"
                            required
                            onChange={(e) => data.append("file", e.target.files[0])}
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">هنرمند</p>
                        <select
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition font-semibold"
                            onChange={(e) => data.append("artist",e.target.value)}
                            defaultValue={artists && artists[0].id}
                            required>
                                {
                                    artists[0] && artists.map((artist,index) => {
                                        return (
                                            <option key={index} value={artist.id}>{artist.name}</option>
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