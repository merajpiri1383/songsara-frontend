"use client"
import { useEffect, useState } from "react";
import API from "../../../../src/api";
import { useSelector } from "react-redux";
import { Zoom } from "react-awesome-reveal";

export default function Moods() {

    const [moods, setMoods] = useState([]);
    const moodToggle = useSelector((state) => state.mood.toggle);
    useEffect(() => {
        (async () => {
            await API.get("/mood/").then((response) => {
                setMoods(response.data)
            }).catch((error) => {
                console.log(error)
            })
        })();
    }, [moodToggle]);

    return (
        <div className="text-white grid grid-cols-5 gap-2 my-6">
            {
                moods && moods.map((mood, index) => {
                    return (
                        <Zoom duration={300} key={index}>
                            <div className="col-span-1 relative">
                                <img
                                    src={mood.image}
                                    alt={mood.name}
                                    className="h-36 object-cover rounded-lg"
                                />
                                <p className="text-white absolute bottom-0 w-full text-center font-semibold">{mood.name}</p>
                            </div>
                        </Zoom>
                    )
                })
            }
        </div>
    )
};