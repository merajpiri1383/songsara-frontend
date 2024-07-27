"use client"
import Loading from "./loading";
import API from "../../src/api";
import { useMemo, useState } from "react";
import Link from "next/link";

export default function List({defaultFilter}) {
    const [list, setList] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [filter,setFilter] = useState(defaultFilter);

    const getData = async () => {
        console.log("get data")
        setShowLoading(true);
        await API.get(`/${filter}/`).then((response) => {
            setList(response.data);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(() => setShowLoading(false), 400));
    };
    useMemo(() => getData(), [filter]);

    return (
        <div className="text-left px-4 my-1">
            <select className="bg-zinc-700 p-2 my-2 text-xl text-white" 
            onChange={(e) => setFilter(e.target.value)}
            defaultValue={defaultFilter}>
                <option value={"track"}>تک موسیقی</option>
                <option value={"album"}>آلبوم</option>
                <option value={"playlist"}>پلی لیست</option>
            </select>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="grid grid-cols-6 gap-4 ">
                    {
                        list[0] && list.map((item, index) => {
                            return (
                                <Link href={"/"} key={index} className="col-span-1 hover:bg-zinc-700 relative">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="h-60 w-full object-cover"
                                    />
                                    <h3 className="text-white text-lg text-left px-2 my-1 h-6 overflow-y-hidden font-semibold">{item.name}</h3>
                                    <h4 className="px-2 my-1 text-amber-400">{item.artist && item.artist.name}</h4>
                                    <h4 className="px-2 my-1 text-zinc-200">{item.genre && item.genre.name}</h4>
                                    <h4 className="px-2 my-1 text-zinc-500">{item.created_date && item.created_date}</h4>
                                    <span className="text-white span-blur absolute top-2 right-2 px-1 rounded-sm">
                                        {
                                            !item.artist && "پلی لیست"
                                        }
                                        {
                                            item.file && "تک موسیقی"
                                        }
                                        {
                                            item.artist && !item.file && "آلبوم"
                                        }
                                    </span>
                                </Link>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
};