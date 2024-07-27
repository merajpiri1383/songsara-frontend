"use client"
import { useState } from "react";
import Logo from "../../public/logo.png";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { BiAlbum } from "react-icons/bi";
import { PiMusicNoteLight } from "react-icons/pi";
import { BsMusicNoteList } from "react-icons/bs";
import { BiSolidAlbum } from "react-icons/bi";
import { BsDatabase } from "react-icons/bs";
import { FaYoutubeSquare } from "react-icons/fa";
import { PiHandshake } from "react-icons/pi";
import { IoBookOutline } from "react-icons/io5";

export default function RightPannel({ children }) {

    const [show, setShow] = useState(false);

    return (
        <>
            <div onClick={() => setShow(true)}>{children}</div>
            <div className={`bg-zinc-700 text-white fixed top-0 right-0 bottom-0 py-6 z-1000 border-l border-gray-500 ${show ? "show-pannel" :"hide-pannel"}`}>
                    <IoClose 
                    className="hover:scale-110 hover:text-amber-400 cursor-poninter mx-12"
                    onClick={() => setShow(false)} size={"1.8rem"} />
                    <Image
                        src={Logo}
                        alt="logo"
                        className="w-60 object-cover my-2 mb-12 mx-12"
                    />
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <BiAlbum className="mr-12" size={"2.2rem"} />
                        <p className="text-2xl text-white font-semibold select-none px-12">آلبوم موسیقی </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <PiMusicNoteLight className="mr-12" size={"2.2rem"} />
                        <p className="text-2xl text-white font-semibold select-none px-12"> تک موسیقی </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <BsMusicNoteList className="mr-12" size={"2.2rem"} />
                        <p className="text-2xl text-white font-semibold select-none px-12"> پلی لیست </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <BiSolidAlbum className="mr-12" size={"2.2rem"} />
                        <p className="text-2xl text-white font-semibold select-none px-12">  پلی لیست Best Of </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 mt-12 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <BsDatabase className="text-gray-500 mr-12" size={"1.8rem"} />
                        <p className="text-lg text-gray-500 font-semibold select-none pl-12">  فول آلبوم ها </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <FaYoutubeSquare className="text-gray-500 mr-12" size={"1.8rem"} />
                        <p className="text-lg text-gray-500 font-semibold select-none pl-12">  کنسرت </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <IoBookOutline className="text-gray-500 mr-12" size={"1.8rem"} />
                        <p className="text-lg text-gray-500 font-semibold select-none pl-12"> راهنما و آموزش ها </p>
                    </div>
                    <div className="flex items-center justify-between py-4 px-3 my-1 border-b border-gray-500 hover:bg-zinc-600 px-12">
                        <PiHandshake className="text-gray-500 mr-12" size={"1.8rem"} />
                        <p className="text-lg text-gray-500 font-semibold select-none pl-12">   همکاری با هنرمندان  </p>
                    </div>
                </div>
        </>
    )
};