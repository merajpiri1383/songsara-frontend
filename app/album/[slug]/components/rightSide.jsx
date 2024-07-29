"use client"
import API from "../../../../src/api";
import { useMemo, useState } from "react";
import Loading from "../../../components/loading";
import Link from "next/link";

export default function RightSide({ album }) {
    const [albums, setAlbums] = useState();
    const [showLoading, setShowLoading] = useState(true);
    const getData = async () => {
        await API.get("/album/").then((response) => {
            setAlbums(response.data.results.filter((item, index) => {
                let result = false
                item.moods.map((mood, index) => {
                    album.moods.map((i) => {
                        result = i.id === mood.id && album.id !== item.id
                    })
                })
                return result;
            }));
        }).finally(() => setTimeout(() => setShowLoading(false), 400));
    };
    useMemo(() => getData(), []);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div className="sticky top-0">
                    <div className="grid grid-cols-6 items-center pr-4 gap-4">
                        <p className="text-white col-span-2 text-lg font-bold">از همین حس و حال</p>
                        <div className="border border-zinc-700 col-span-4 w-full bg-zinc-200"></div>
                    </div>
                    <div>
                        {
                            albums && albums.map((item, index) => {
                                return (
                                    <Link href={"/album/" + item.slug}>
                                        <div className="grid grid-cols-5  my-4 hover:bg-zinc-700">
                                            <div className="col-span-3 px-4">
                                                <h2 className="text-lg text-white font-semibold text-left">{item.name}</h2>
                                                <Link href={"/"}>
                                                    <p className="text-zinc-200 text-left mt-2">{item.artist.name}</p>
                                                </Link>
                                                <Link href={"/"}>
                                                    <p className="text-zinc-300 text-left mt-2">{item.genre.name}</p>
                                                </Link>
                                                <p className="text-zinc-500 text-left mt-2">{item.created_date}</p>
                                            </div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-48 object-cover col-span-2 "
                                            />
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            }
        </>
    )
};