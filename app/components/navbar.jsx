"use client"
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { GoSearch } from "react-icons/go";
import Link from "next/link";
import { useSelector } from "react-redux";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { BsMusicNoteList } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa6";
import { LuMusic4 } from "react-icons/lu";

export default function Nabvbar() {

    const user = useSelector((state) => state.user);

    console.log(user);

    return (
        <div className="bg-zinc-900 grid grid-cols-9 p-3 px-8">
            <div className="col-span-6 grid grid-cols-9 gap-2 items-center">
                <RxHamburgerMenu color="white" size={"2.8rem"} className="col-span-1" />
                <Link className="col-span-2" href={"/"} >
                    <Image
                        src={Logo}
                        alt="logo"
                    />
                </Link>
                {
                    user.is_login && <div className="col-span-2 flex items-center gap-6 justify-center">
                        <Link href={"/"}>
                            <FaRegHeart size={"1.8rem"} className="text-white" />
                        </Link>
                        <Link href={"/"}>
                            <BsMusicNoteList size={"1.8rem"} className="text-white" />
                        </Link>
                        <Link href={"/"}>
                            <LuMusic4 size={"1.8rem"} className="text-white" />
                        </Link>
                    </div>
                }
                <div className={`${user.is_login ? "col-span-3" : "col-span-5"} bg-zinc-800 grid-cols-8 grid rounded-3xl`}>
                    <input
                        placeholder="جستجو کنید"
                        className="col-span-7 w-full bg-inherit outline-none rounded-r-3xl
                        focus:bg-zinc-700 p-2 text-white text-lg px-4 transition"
                    />
                    <button className="flex justify-center items-center">
                        <GoSearch className="text-gray-400 col-span-1 hover:test-gray-100" size={"1.8rem"} />
                    </button>
                </div>
            </div>

            <div className="col-span-3 flex items-center justify-end">
                {
                    !user.is_login && <button className="flex items-center justify-between gap-3 bg-white text-lg p-2 rounded-3xl">
                        <FaRegUser color="black" size={"1.3rem"} />
                        <Link href={"/login"}>
                            <p className="text-zinc-900 hover:text-gray-300"> ورود / ثبت نام</p>
                        </Link>
                    </button>
                }
                {
                    user.is_login && <div className="grid grid-cols-4 gap-3 items-center">
                        <div className="col-span-1 relative">
                            <IoNotificationsOutline className="text-white" size={"2rem"} />
                            <span className="absolute text-white bg-red-400 rounded-full px-2 p-1 text-xs -top-1 -right-1">0</span>
                        </div>
                        <div className="col-span-3 flex items-center justify-between bg-zinc-800 p-2 rounded-lg 
                        hover:bg-zinc-700 cursor-pointer transition">
                            <FaRegUser size={"1.5rem"} className="text-gray-400 bg-zinc-800 p-1 rounded-full" />
                            <p className="text-white text-lg font-semibold">{user.username}</p>
                            <FaCaretDown size={"1rem"} className="text-white" />
                        </div>
                    </div>
                }
            </div>
        </div>
    )
};