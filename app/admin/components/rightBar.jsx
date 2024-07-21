"use client"
import { Zoom } from "react-awesome-reveal";
import Link from "next/link";

export default function RightBar() {

    return (
        <Zoom duration={300}>
            <div className="bg-zinc-800 p-2 rounded-md my-12 mx-6">
                <Link href="/admin/mood/">
                    <div className="w-full my-1 border border-zinc-700 transition p-2 rounded-md hover:bg-zinc-700">
                        <p className="text-white text-center text-lg select-none">افزودن حس حال</p>
                    </div> 
                </Link>
                <Link href="/admin/genre/">
                    <div className="w-full my-1 border border-zinc-700 transition p-2 rounded-md hover:bg-zinc-700">
                        <p className="text-white text-center text-lg select-none">افزودن سبک</p>
                    </div>
                </Link>
                <Link href="/admin/artist/">
                    <div className="w-full my-1 border border-zinc-700 transition p-2 rounded-md hover:bg-zinc-700">
                        <p className="text-white text-center text-lg select-none">افزودن هنرمند</p>
                    </div>
                </Link>
                <Link href="/admin/album/">
                    <div className="w-full my-1 border border-zinc-700 transition p-2 rounded-md hover:bg-zinc-700">
                        <p className="text-white text-center text-lg select-none">افزودن آلبوم</p>
                    </div>
                </Link>
            </div>
        </Zoom>
    )
};