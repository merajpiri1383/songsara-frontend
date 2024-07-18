"use client"

import { LiaUserEditSolid } from "react-icons/lia";
import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";

export default function Register() {
    return (
        <div className="bg-zinc-900 p-6">
            <h1 className="text-white text-center text-2xl font-semibold my-3">عضویت</h1>
            <div className="grid grid-cols-2">
                <form className="col-span-1 p-3">
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">نام کاربری</p>
                        <input
                            placeholder="به صورت انگلیسی و حروف کوچک بدون فاصله وارد کنید"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition"
                            type="text"
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">آدرس ایمیل</p>
                        <input
                            placeholder="آدرس ایمیل خود را دقیق و صحیح وارد کنید"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition"
                            type="text"
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">رمزعبور</p>
                        <input
                            placeholder="شامل حروف، عدد و حداقل 6 کارکتر"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition"
                            type="text"
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">تکرار رمزعبور</p>
                        <input
                            placeholder="شامل حروف، عدد و حداقل 6 کارکتر"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition"
                            type="password"
                        />
                    </div>
                    <div className="flex justify-start gap-2 my-2">
                        <input type="checkbox" />
                        <p className="text-gray-300 text-right">مرا به خاطر بسپار</p>
                    </div>
                    <button className="w-full p-1 py-3 text-lg text-zinc-900 bg-amber-300 rounded-md font-semibold">عضویت در سایت</button>
                    <div className="my-2 flex items-center justify-start gap-2">
                        <p className="text-gray-300">عضو هستید ؟</p>
                        <Link className="text-gray-500" href="/login"> ورود به حساب</Link>
                    </div>
                </form>
                <div className="col-span-1 grid grid-cols-1 border-r border-gray-700">
                    <div className="col-span-1 flex justify-center">
                        <LiaUserEditSolid className="text-amber-300" size={"11rem"} />
                    </div>
                    <div className="my-4 flex justify-center col-span-1 items-center">
                        <p className="text-white border w-96 border-gray-700 p-2 rounded-3xl text-center text-xl">
                            عضویت در سایت / خرید اشتراک
                        </p>
                    </div>
                    <div className="col-span-1 my-2 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300"> اطلاع از آثار جدید هنرمندان علاقمند شده</p>
                    </div>
                    <div className="col-span-1 my-2 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300">امکان دانلود با کیفیت FLAC / MP3 320kpbs</p>
                    </div>
                    <div className="col-span-1 my-2 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300">ساخت پلی لیست های شخصی</p>
                    </div>
                    <div className="col-span-1 my-2 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300"> افزودن موسیقی به لیست علاقمندی ها</p>
                    </div>
                    <div className="col-span-1 my-2 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300">امکان دنبال کردن هنرمندان مورد علاقه</p>
                    </div>
                </div>
            </div>
        </div>
    )
};