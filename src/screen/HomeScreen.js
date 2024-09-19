import React from 'react'
import Suggestion from '../component/Suggestion';
import TopRestraunt from '../component/TopRestraunt';
import OnlineRestraunt from '../component/OnlineRestraunt';
import useFetchData from '../utils/data';

const HomeScreen = () => {
    const {items , isLoading, error} =  useFetchData(process.env.REACT_APP_SWIGGY_API);
    const data = items;

    return (
        <div className="mt-[108px]">
            <Suggestion data={data} loading={isLoading}/>
            <TopRestraunt data={data} loading={isLoading}/>
            <OnlineRestraunt data={data} />
        </div>
    )
}

export default HomeScreen