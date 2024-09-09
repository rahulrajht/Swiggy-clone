import { useParams, Link } from "react-router-dom";
import {useEffect , useState} from 'react';
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSort, faStar } from "@fortawesome/free-solid-svg-icons";

export default function Collections () {
    const params = useParams();
    const [collections , setCollections ] = useState([]);
    const [filters , setFilters] = useState([]);
    const [ fetchResults , setFetchResults ] = useState()
    const url = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&collection=";

    const payload = {
        "lat": 12.9715987,
        "lng": 77.5945627,
        "collection": "83673",
        "tags": "layout_FestiveEvent7",
        "sortBy": "",
        "filters": "",
        "type": "rcv2",
        "nextOffset": "CJ9gEOMTKICo+Oi1h+3RcTCnGzgC",
        "widgetOffset": {
            "restaurantCountWidget": "",
            "collectionV5RestaurantListWidget": "4",
            "inlineFacetFilter": "",
            "layout_FestiveEvent7_Flexipage_Themes1_StackedWidget": ""
        },
        "page_type": null,
        "_csrf": "HiyNbbxyPvuK-Coi1p-d8_3NIf1Q580jPX3r0YWg"
    }

    useEffect(() => {
     fetchCollectionsLists()
    }, [])

    async function fetchCollectionsLists() {
        const result = await axios.get(url+params.id+"&tags=layout_FestiveEvent7&sortBy=&filters=&type=rcv2&offset=0&page_type=null");
        setFetchResults(result?.data?.data?.cards)
        setFilters(result?.data?.data?.cards[0]?.card?.card?.facetList[2].facetInfo)
        setCollections(result?.data?.data?.cards.slice(2))
    }
    
    return (
        <div className="collections flex flex-col">
            <div className="filter">
                <ul className="flex w-full ">
                <li className="filter-items w-[80px] text-center" >Filter <FontAwesomeIcon icon={faFilter}/></li>
                <li className="filter-items w-[80px] text-center" >Sort By <FontAwesomeIcon icon={faSort}/></li>

                    {filters.map((item) =>(
                        <li className="filter-items" key={item.id}>{item.label}</li>
                    ))}
                </ul>
            </div>
            <h2 className="text-xl font-bold mt-4">{fetchResults && fetchResults[0].card.card.restaurantCount} restaurants to explore</h2>
            <div className="flex mt-4">
            { collections.length >0 ? collections.map((item) => (
                <Link key={item.card.card.info.id} className="w-[20rem] block">
                    <div className="bg-white max-w-2xl pr-[32px] lg:max-w-7xl ">
                        <div className=" grid grid-cols-1 gap-x-6 gap-y-10 xl:gap-x-8 shadow-lg rounded restraunt-image " >
                            <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded bg-gray-200 lg:aspect-none group-hover:opacity-75 h-[200px]">
                            <img
                                alt={item.card.card.info.name}
                                src={process.env.REACT_APP_TOP_API+item.card.card.info.cloudinaryImageId}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded"
                            />
                            </div>
                        </div>
                        <div className="mt-2 font-extralight">
                            <h2 className="font-semibold">{item.card.card.info.name}</h2>
                            <p className="font-normal">{item.card.card.info.avgRating} <FontAwesomeIcon  icon={faStar} color="green" /> <span className="font-normal">{item.card.card.info.sla.slaString}</span></p>
                            <h2 className="text-wrap">{item.card.card.info.cuisines.join(", ")}</h2>
                            <span>{item.card.card.info.locality}</span>
                        </div>
                    </div>
                </Link>
            ))  : "No items"}
            </div>
        </div>
    )
} 