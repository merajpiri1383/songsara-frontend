"use client"
import { Zoom } from "react-awesome-reveal";
import Link from "next/link";

export default function RightBar() {

    return (
        <Zoom duration={300}>
            <div className="bg-zinc-800 p-2 rounded-md my-12 mx-6">
                <Link href="/admin/mood/">
                    <div className="w-full my-1 border border-zinc-700 transition p-2 rounded-md hover:bg-zinc-700">
                        <p className="text-white text-center text-lg">افزودن حس حال</p>
                    </div>
                </Link>
            </div>
        </Zoom>
    )
};