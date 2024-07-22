"use client"
import { Zoom } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import API from "../../src/api";
import { FaAngleLeft } from "react-icons/fa";
import Loading from "../components/loading";

export default function Mood() {

    const [moods, setMoods] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    useEffect(() => {
        (async () => {
            await API.get("/mood/").then((response) => {
                setMoods(response.data);
                setTimeout(() => setShowLoading(false), 400);
            }).catch((error) => {
                console.log(error);
            })
        })();
    }, []);

    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <>
                    <div className="flex items-center justify-between p-3">
                        <h1 className="text-right text-white text-xl font-semibold">حس و حال</h1>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-500"> نمایش همه</p>
                            <FaAngleLeft size={"1rem"} color="gray" />
                        </div>
                    </div>
                    <div className="p-3 items-center gap-3 moods">
                        {
                            moods && moods.map((mood, index) => {
                                return (
                                    <Zoom key={index} duration={200}>
                                        <div className="w-44 h-28 mood flex items-center justify-center" 
                                        style={{backgroundColor : `#${mood.hex_color}`}}>
                                            <p className="text-white font-semibold text-lg">{mood.name}</p>
                                        </div>
                                    </Zoom>
                                )
                            })
                        }
                    </div>
                </>
            }
        </>
    )
};