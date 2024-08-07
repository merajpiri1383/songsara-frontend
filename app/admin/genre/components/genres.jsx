"use client"
import { useEffect, useState } from "react";
import API from "../../../../src/api";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/loading";
import { Zoom } from "react-awesome-reveal";
import { changeToggleGenre } from "../../../../src/reducers/toggle";

export default function Genres() {
    const [showLoading, setShowLoading] = useState(true);
    const genreToggle = useSelector((state) => state.toggle.genre);
    const [genres, setGenres] = useState([]);
    const dispatch = useDispatch();
    const getData = async () => {
        setShowLoading(true);
        await API.get('/genre/').then((response) => {
            setGenres(response.data);
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status === 401 && getData();
        });
        setTimeout(() => setShowLoading(false), 400);
    };
    useEffect(() => {
        getData();
    }, [genreToggle]);

    const deleteHandeler = async (slug) => {
        setShowLoading(true);
        await API.delete(`/genre/${slug}/`).then((response) => {
            dispatch(changeToggleGenre());
            setTimeout(() => setShowLoading(false), 400);
        }).catch((error) => {
            error.response && error.response.status == 401 && deleteHandeler(slug);
        })
    }
    return (
        <>
            {
                showLoading && <Loading />
            }
            {
                !showLoading && <Zoom duration={300}>
                    <div className="grid grid-cols-4 p-3 gap-3 my-3">
                        {
                            genres && genres.map((genre, index) => {
                                return (
                                    <div key={index} className="col-span-1 h-20 text-white bg-zinc-800 rounded-lg p-3 relative">
                                        <h3 className="text-center font-semibold">{genre.name}</h3>
                                        <button
                                            type="button"
                                            onClick={() => deleteHandeler(genre.slug)}
                                            className="bg-red-400 text-white rounded-md p-1 absolute bottom-0 left-0">حذف</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Zoom>
            }
        </>
    )
};