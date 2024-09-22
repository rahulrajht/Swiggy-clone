import React from 'react'
import Suggestion from '../component/Suggestion';
import TopRestraunt from '../component/TopRestraunt';
import OnlineRestraunt from '../component/OnlineRestraunt';
import useFetchData from '../utils/data';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
    const {lat ,lng } = useSelector((store)=> store.location.coord);
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;
    const {isLoading} =  useFetchData(url);
    return (
        <div className="mt-[108px]">
            <Suggestion loading={isLoading}/>
            <TopRestraunt loading={isLoading}/>
            <OnlineRestraunt loading={isLoading}/>
        </div>
    )
}

export default HomeScreen