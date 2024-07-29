"use client"
import { lazy } from 'react';
import Loading from '../../../components/loading';
import API from '../../../../src/api';
import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from "next/link";
const Info = lazy(() => import("./info"));
const Tracks = lazy(() => import("../../components/tracks"));
const RightSide = lazy(() => import("./rightSide"));


export default function GetTrack() {
    const [showLoading, setShowLoading] = useState(true);
    const [track, setTrack] = useState();
    const params = useParams();
    const getData = async () => {
        await API.get('/playlist/' + params.slug).then((response) => {
            setTrack(response.data);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        }).finally(() => setTimeout(() => setShowLoading(false), 400));
    };

    useMemo(() => getData(), []);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <div>
                    <div className="text-white my-9 px-6 text-lg flex items-center gap-2 select-none">
                        <Link href={"/"} className="hover:text-zinc-500 text-zinc-200">سانگ سرا (جهان موسیقی بی کلام)</Link> /
                        <Link href={"/"} className="text-zinc-400 hover:text-zinc-500">{track.artist.name}</Link> /
                        <p>تک موسیقی بی کلام</p>
                        <p>{track.name}</p>
                    </div>
                    <div className='grid grid-cols-12 gap-4'>
                        <div className='col-span-4'>
                            {/* <RightSide track={track} /> */}
                        </div>
                        <div className='col-span-8 p-4'>
                            <Info track={track} />
                            <Tracks tracks={[track]} />
                        </div>
                    </div>
                </div>
            }
        </>
    )
};