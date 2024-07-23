"use client"
import { FaPlay } from "react-icons/fa";
import { IoPlaySkipForward } from "react-icons/io5";
import { IoPlaySkipBack } from "react-icons/io5";
import { HiSpeakerWave } from "react-icons/hi2";
import { LuRefreshCcw } from "react-icons/lu";
import { FaPause } from "react-icons/fa";
import { useEffect, useState } from "react";
import Loader from "./loader";

export default function RunTrack({ track }) {
    const [showLoading, setShowLoading] = useState(true);
    const [audio, setAudio] = useState();
    let audioTimer = document.getElementById("audio_timer") ;
    const timerGrow = document.getElementById("timer_grow");
    const [play, setPlay] = useState(false);

    useEffect(() => {
        setShowLoading(true);
        audio && audio.pause();
        setPlay(false);
        setAudio(new Audio(track.file));
        setTimeout(() => setShowLoading(false),400);
    },[track]);

    useEffect(() => {
        if (audio){
            play ? audio.play() : audio.pause();
        }
    },[play]);

    useEffect(() => {
        setTimeout(() => setShowLoading(false),400);
    },[]);


    if (audio) {
        audio.ontimeupdate = () => {
            console.log("playing ...")
            let minutes = Math.floor(audio.currentTime / 60);
            let seconds = Math.floor(audio.currentTime >= minutes * 60 ? audio.currentTime - minutes * 60 : audio.currentTime);
            audioTimer.innerText = `${minutes > 9 ? minutes : "0" + minutes}:${seconds > 9 ? seconds : "0" + seconds}`;
            timerGrow.style.left = `${audio.currentTime / audio.duration * 100}%`
        }
    }

    return (
        <>
            {
                showLoading && <Loader />
            }
            {
                !showLoading && <div className="fixed bg-zinc-900 px-3 py-5 w-full left-0 right-0 bottom-0 grid grid-cols-12">
                    <div className="col-span-1 flex items-center justify-between px-1">
                        <HiSpeakerWave size={"1.8rem"} color="white" />
                        <p className="text-white text-xs"> {track.duration} / <span id="audio_timer"></span> </p>
                    </div>
                    <div className="col-span-9 flex items-center p-2 px-4">
                        <div className="bg-gray-400 h-1 hover:h-1.5 w-full relative rounded-lg">
                            <span id="timer_grow" className="bg-amber-400 size-4 rounded-full absolute -bottom-1 left-0"></span>
                        </div>
                    </div>
                    <div className="col-span-2 flex items-center justify-between px-5">
                        <LuRefreshCcw color="white" size={"1.8rem"} />
                        <IoPlaySkipForward color="white" size={"1.8rem"} />
                        <IoPlaySkipBack color="white" size={"1.8rem"} />
                        {
                            play && <FaPause color="white" size={"1.8rem"} onClick={() => setPlay(!play)} />
                        }
                        {
                            !play && <FaPlay color="white" size={"1.8rem"} onClick={() => setPlay(!play)} />
                        }
                    </div>
                </div>
            }
        </>
    )
};