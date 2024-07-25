"use client"
import { lazy } from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import Loading from "../../components/loading";
import { Fade } from "react-awesome-reveal";
import { FaPlus } from "react-icons/fa6";
import { CgSoftwareDownload } from "react-icons/cg";
const RunTrack = lazy(() => import("./runTrack"));


export default function Tracks({ tracks }) {
    const track = useSelector((state) => state.track);
    const [showLoading, setShowLoading] = useState(true);
    const [currentTrack, setCurrentTrack] = useState({});

    useEffect(() => {
        setShowLoading(true);
        tracks && setTimeout(() => setShowLoading(false), 400);
        tracks && setCurrentTrack(tracks[0]);
    }, [tracks])

    useEffect(() => {
        if (tracks) {
            if (tracks.indexOf(currentTrack) - 1 < 0) {
                tracks && setCurrentTrack(tracks[tracks.length - 1]);
            } else {
                tracks && setCurrentTrack(tracks[tracks.indexOf(currentTrack) - 1]);
            }
        }
    }, [track.track_before])

    useEffect(() => {
        if (tracks) {
            if (tracks.indexOf(currentTrack) + 1 > tracks.length - 1) {
                tracks && setCurrentTrack(tracks[0]);
            } else {
                tracks && setCurrentTrack(tracks[tracks.indexOf(currentTrack) + 1]);
            }
        }
    }, [track.track_next]);

    useEffect(() => {
        setShowLoading(true);
        setTimeout(() => setShowLoading(false), 400);
    }, [currentTrack])

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Fade duration={300}>
                    <div className="grid grid-cols-1 justify-center items-center p-3 my-6 relative">
                        {
                            tracks[0] && tracks.map((item, index) => {
                                return (
                                    <div key={index}
                                        className={`col-span-1 py-3 border-b border-gray-700 my-1 flex items-center justify-between
                                        hover:text-amber-400 cursor-pointer ${currentTrack && currentTrack.id === item.id ? "text-amber-400" : "text-white"}`}
                                        onClick={() => setCurrentTrack(item)}>
                                        <div className="grid grid-cols-3 gap-6 items-center">
                                            <FaPlus className="col-span-1" color="white" size={"1.8rem"} />
                                            <CgSoftwareDownload className="col-span-1" color="white" size={"1.8rem"} />
                                            <p className="col-span-1">{item.duration}</p>
                                        </div>
                                        <div className="flex justify-between items-center gap-9">
                                            <div className="col-span-1">
                                                <p className="font-semibold text-lg text-left">{item.name}</p>
                                                <p className="text-gray-500 text-sm text-left">{item.artist.name}</p>
                                            </div>
                                            <p className="col-span-1">{index + 1}</p>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {
                            tracks[0] && <RunTrack track={currentTrack} />
                        }
                    </div>
                </Fade>
            }
        </>
    )
};