"use client"

import { useState } from "react";
import { MdSpeed } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
import { LuMusic4 } from "react-icons/lu";
import { BsMusicNoteList } from "react-icons/bs";
import { FaCreditCard } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";

export default function Dropdown({ children }) {
    const [showDropDown, setShowDropDown] = useState(false);

    return (
        <div className="col-span-3 relative">
            <div onClick={() => setShowDropDown(!showDropDown)}>{children}</div>
            {
                showDropDown && <div onMouseLeave={() => setShowDropDown(false)}
                className="absolute bg-stone-800 top-14 z-100 left-0 w-60 rounded-lg p-2 z-1000">
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <MdSpeed size={"2rem"} className="text-white" />
                        <p className="px-2"> جزییات  پنل کاربری </p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <FaRegHeart size={"2rem"} className="text-white" />
                        <p className="px-2"> آثار مورد علاقه من</p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <LuMusic4 size={"2rem"} className="text-white" />
                        <p className="px-2"> هنرمندان دنبال شده</p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <BsMusicNoteList size={"2rem"} className="text-white" />
                        <p className="px-2"> پلی لیست های من</p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <FaCreditCard size={"2rem"} className="text-white" />
                        <p className="px-2"> خرید / تمدید اشتراک </p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <BsCart3 size={"2rem"} className="text-white" />
                        <p className="px-2"> سفارشات خ اشتراک </p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <FaDownload size={"2rem"} className="text-white" />
                        <p className="px-2"> دانلودی های اخیر </p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <MdSupportAgent size={"2rem"} className="text-white" />
                        <p className="px-2"> ارتباط با پشتیبانی </p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <RiAdminFill size={"2rem"} className="text-white" />
                        <p className="px-2">ادمین</p>
                    </div>
                    <div className="w-full my-1 py-1 text-white flex px-3 items-center justify-between">
                        <MdOutlinePowerSettingsNew size={"2rem"} className="text-white" />
                        <p className="px-2"> خارج شدن از حساب </p>
                    </div>
                </div>
            }
        </div>
    )
};