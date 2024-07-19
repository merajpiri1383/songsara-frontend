"use client"

import { useEffect, useState } from "react";
import API from "../../src/api";
import { FaAngleLeft } from "react-icons/fa";

export default function Mood() {

    const [moods, setMoods] = useState([]);
    useEffect(() => {
        (async () => {
            await API.get("/mood/").then((response) => {
                setMoods(response.data);
            }).catch((error) => {
                console.log(error);
            })
        })();
    }, []);

    return (
        <>
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
                            <div key={index} className="w-44 h-36 relative mood">
                                <img
                                    src={mood.image}
                                    alt={mood.name}
                                    className="w-full h-full object-cover"
                                />
                                <p className="text-white flex font-semibold w-full flex justify-center absolute bottom-1">{mood.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
};