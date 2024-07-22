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
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeUser } from "../../src/reducers/user";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import API from "../../src/api";

export default function Dropdown({ children }) {
    const [showDropDown, setShowDropDown] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();

    const exitAccount = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        dispatch(changeUser({
            is_login : false , 
            username : null , 
            is_staff : false , 
            is_active : false ,
            email : null , 
        }));
        API.defaults.headers.common.Authorization = null;
        router.push("/login");
    }

    return (
        <div className="col-span-3 relative">
            <div onClick={() => setShowDropDown(!showDropDown)}>{children}</div>
            {
                showDropDown && <div onMouseLeave={() => setShowDropDown(false)}
                    className="absolute bg-stone-800 top-14 z-100 left-0 w-60 rounded-lg p-2 z-1000">
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <MdSpeed size={"2rem"} className="text-white" />
                        <p className="px-2"> جزییات  پنل کاربری </p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <FaRegHeart size={"2rem"} className="text-white" />
                        <p className="px-2"> آثار مورد علاقه من</p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <LuMusic4 size={"2rem"} className="text-white" />
                        <p className="px-2"> هنرمندان دنبال شده</p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <BsMusicNoteList size={"2rem"} className="text-white" />
                        <p className="px-2"> پلی لیست های من</p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <FaCreditCard size={"2rem"} className="text-white" />
                        <p className="px-2"> خرید / تمدید اشتراک </p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <BsCart3 size={"2rem"} className="text-white" />
                        <p className="px-2"> سفارشات خ اشتراک </p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <FaDownload size={"2rem"} className="text-white" />
                        <p className="px-2"> دانلودی های اخیر </p>
                    </div>
                    <div className="w-full my-1 py-1 select-none active:bg-gray-400
                     text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <MdSupportAgent size={"2rem"} className="text-white" />
                        <p className="px-2"> ارتباط با پشتیبانی </p>
                    </div>
                    <Link href={"/admin"}>
                        <div className="w-full my-1 py-1 select-none active:bg-gray-400
                         text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                            <RiAdminFill size={"2rem"} className="text-white" />
                            <p className="px-2">ادمین</p>
                        </div>
                    </Link>
                    <div
                        onClick={() => exitAccount()}
                        className="w-full my-1 cursor-pointer select-none active:bg-gray-400
                     py-1 text-white flex px-3 items-center justify-between hover:bg-stone-600 rounded-sm">
                        <MdOutlinePowerSettingsNew size={"2rem"} className="text-white" />
                        <p className="px-2"> خارج شدن از حساب </p>
                    </div>
                </div>
            }
        </div>
    )
};