"use client"

import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import { IoMdDownload } from "react-icons/io";
import { CiBookmark } from "react-icons/ci";

export default function Info({ playlist }) {
    return (
        <>
            {
                playlist && <div>
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 h-80 grid grid-rows-6 gap-0">
                            <div className="row-span-5">
                                <h1 className="text-white text-3xl mb-4 text-left font-bold">{playlist.name}</h1>
                                {/* <Link href={"/"}>
                            <h2 className="text-zinc-200 text-xl my-4 font-semibold text-left w-full col-span-1">{playlist.genre.name}</h2>
                        </Link> */}
                                <h2 className="justify-end my-6 col-span-1 flex items-center gap-2 text-zinc-400">
                                    {
                                        playlist.moods && playlist.moods.map((mood, index) => {
                                            return (
                                                <Link href={"/"} key={index} className="mx-2">
                                                    {mood.name}
                                                </Link>
                                            )
                                        })
                                    }
                                </h2>
                            </div>
                            <h3 className="text-left text-zinc-200 gap-3 flex items-end justify-end row-span-1">
                                <p>{playlist.created_date}</p>
                                {/* <p>{playlist.tracks.length} tracks</p> */}
                            </h3>
                        </div>
                        <div className="col-span-1">
                            <img
                                src={playlist.image}
                                alt={playlist.name}
                                className="w-full h-80 object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 px-12 my-3">
                        <CiBookmark className="text-zinc-400 cursor-pointer" size={"2.5rem"} />
                        <IoMdDownload className="text-zinc-200 cursor-pointer" size={"2.5rem"} />
                        <FaCirclePlay className="text-amber-400 hover:text-zinc-200 cursor-pointer" size={"2.5rem"} />
                    </div>
                </div>
            }
        </>
    )
};