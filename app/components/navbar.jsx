import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import Logo from "../../public/logo.png";
import Image from "next/image";
import { GoSearch } from "react-icons/go";
import Link from "next/link";

export default function Nabvbar() {
    return (
        <div className="bg-zinc-900 grid grid-cols-9 p-3 px-8">
            <div className="col-span-5 grid grid-cols-9 gap-2">
                <RxHamburgerMenu color="white" size={"2.8rem"} className="col-span-1" />
                <Link className="col-span-2" href={"/"} >
                    <Image
                        src={Logo}
                        alt="logo"
                    />
                </Link>
                <div className="col-span-5 bg-zinc-800 grid-cols-8 grid rounded-3xl">
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
            <div className="col-span-4 flex items-center justify-end">
                <button className="flex items-center justify-between gap-3 bg-white text-lg p-2 rounded-3xl">
                    <FaRegUser color="black" size={"1.3rem"} />
                    <Link href={"/login"}>
                        <p className="text-zinc-900 hover:text-gray-300"> ورود / ثبت نام</p>
                    </Link>
                </button>
            </div>
        </div>
    )
};