import Carousel from "./Carousel";
import React from 'react';
import { Link } from "react-router-dom";
import SkeletonUI from "./Skleton";
import { useSelector } from "react-redux";

const renderImageItem = (item) => (
    <Link to={item.action.link.split("/").slice(3).join("/")}>
        <div className="bg-white overflow-hidden  h-48 md:h-64 lg:h-80 w-[150px]">
            <img src={process.env.REACT_APP_API_URL + item.imageId} alt={item.title} className=" h-full object-contain" />
        </div>
    </Link>
);

export default function Suggestion ({loading}) {
    const data = useSelector((store) => store.data.items);
    const slides = data?.data?.cards[0]?.card?.card?.imageGridCards?.info;
    return (
        <div className="ml-4 suggestion">
            <h2 className="font-bold text-xl mt-8">What's on your mind?</h2>
            {loading ? <SkeletonUI /> :
                <Carousel slides={slides} imageURI={process.env.REACT_APP_API_URL} renderItem={renderImageItem} slideToShow={8}/>
            }
            <hr className="divider"/>
        </div>
    )

}