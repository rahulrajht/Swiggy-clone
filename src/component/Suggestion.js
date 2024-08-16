import Carousel from "./Carousel";
import React , {useEffect , useState} from 'react';
import axios from 'axios';
export default function Suggestion () {
    const [slides , setSlides] = useState([]);

    useEffect(()=>{
        fetchData();
    },[])

    async function fetchData() {
        const result = await axios.get("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
        console.log(result?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info)
        setSlides(result?.data?.data?.cards[0]?.card?.card?.imageGridCards?.info)
    }

    return (
        <div className="ml-4 suggestion">
            <h2 className="font-bold text-xl mt-8">What's on your mind?</h2>
            <Carousel slides={slides}/>
            <hr className="divider"/>
        </div>
    )

}