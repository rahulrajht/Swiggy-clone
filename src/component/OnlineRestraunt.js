import { Link } from "react-router-dom";
import useFetch from "../utils/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import SkeletonUI from "./Skleton";
import { useSelector } from "react-redux";

export default function OnlineRestraunt({loading}) {
    const data = useSelector(store=> store.data.items)
    const onlineRestraunt = data?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    const title = data?.data?.cards[2]?.card?.card?.title

    return (
        <div className="mt-8">
            <div>
                <h2 className="font-bold text-xl ">{title}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full mt-8">
                {loading ? <SkeletonUI count={4}/> : onlineRestraunt?.map((item) => (
                    <Link key={item?.info?.id} to={item && `${`restraunt/${item.info.id}`}  ${item.info.name} ${item.info.locality} ${item.info.areaName}`.split(" ").join("-").toLowerCase()} className="w-[20rem] block">
                        <div className="bg-white mx-auto max-w-2xl pr-[32px] py-1 sm:px-6 sm:py-2 lg:max-w-7xl ">
                            <div className=" grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8 shadow-lg rounded restraunt-image " >
                                <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded bg-gray-200 lg:aspect-none group-hover:opacity-75 h-[200px]">
                                    <img
                                        alt={item.info.name}
                                        src={process.env.REACT_APP_TOP_API + item.info.cloudinaryImageId}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded"
                                    />
                                    <div className="absolute offer bottom-0 bg-black bg-opacity-20 text-white text-l font-bold py-1 w-full px-2">
                                        {item?.info?.aggregatedDiscountInfoV3?.header === "ITEMS" ? item?.info?.aggregatedDiscountInfoV3?.header + " " + item?.info?.aggregatedDiscountInfoV3?.subHeader : item?.info?.aggregatedDiscountInfoV3?.header}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 font-extralight">
                                <h2>{item.info.name}</h2>
                                <p>{item.info.avgRating} <FontAwesomeIcon icon={faStar} color="green" /> <span className="font-normal">{item.info.sla.slaString}</span></p>
                                <h2 className="text-wrap">{item.info.cuisines.join(", ")}</h2>
                                <span>{item.info.locality}</span>
                            </div>
                        </div>
                    </Link>
                ))
                }
            </div>
        </div>
    )
}