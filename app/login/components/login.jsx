"use client"

import { LuLogIn } from "react-icons/lu";
import { FaAngleLeft } from "react-icons/fa6";
import Link from "next/link";

export default function Login() {
    return (
        <div className="bg-zinc-900 p-6 h-screen">
            <h1 className="text-white text-center text-2xl font-semibold my-3">ورود به حساب کاربری</h1>
            <div className="grid grid-cols-2">
                <form className="col-span-1 p-3">
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">نام کاربری / آدرس ایمیل</p>
                        <input
                            placeholder="نام کاربری یا آدرس ایمیل را وارد کنید"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition"
                            type="text"
                        />
                    </div>
                    <div className="my-2">
                        <p className="text-gray-300 text-right my-1">رمزعبور</p>
                        <input
                            placeholder="کلمه عبور / رمز عبور را وارد کنید"
                            className="border border-gray-700 rounded-md bg-zinc-800 w-full p-1 text-lg my-1 py-3 outline-none
                            focus:bg-gray-200 focus:text-black text-white transition"
                            type="password"
                        />
                    </div>
                    <div className="flex justify-start gap-2 my-2">
                        <input type="checkbox" />
                        <p className="text-gray-300 text-right">مرا به خاطر بسپار</p>
                    </div>
                    <button className="w-full p-1 py-3 text-lg text-zinc-900 bg-amber-300 rounded-md font-semibold"> ورود به حساب</button>
                    <div className="my-2 flex items-center justify-start gap-2">
                        <p className="text-gray-300">ثبت نام نکرده اید ؟</p>
                        <Link className="text-gray-500" href="/register">عضویت</Link>
                    </div>
                    <div className="my-2 flex items-center justify-start gap-2">
                        <p className="text-gray-300">کلمه عبور را فراموش کرده اید؟</p>
                        <Link className="text-gray-500" href="/">تغییر پسورد</Link>
                    </div>
                </form>
                <div className="col-span-1 grid grid-cols-1 border-r border-gray-700">
                    <div className="col-span-1 flex justify-center">
                        <LuLogIn className="text-amber-300" size={"9rem"} />
                    </div>
                    <div className="my-4 flex justify-center col-span-1 items-center">
                        <p className="text-white border w-96 border-gray-700 p-2 rounded-3xl text-center text-xl">ورود به سایت</p>
                    </div>
                    <div className="col-span-1 my-3 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300"> ترجیحا در ویندوز از مرورگر اج و در اندروید از گوگل کروم استفاده کنید.</p>
                    </div>
                    <div className="col-span-1 my-3 flex justify-start gap-2 px-6 items-center">
                        <FaAngleLeft className="text-gray-300" />
                        <p className="text-gray-300"> در صورت بروز مشکل در ورود به حساب خود با پشتیبانی سایت تماس بگیرید.</p>
                    </div>
                </div>
            </div>
        </div>
    )
};