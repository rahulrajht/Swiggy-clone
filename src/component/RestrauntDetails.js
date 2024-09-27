import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import React, { useEffect, useState } from 'react';
import { CardContent, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faBicycle, faStar } from '@fortawesome/free-solid-svg-icons';
import { orange } from "@mui/material/colors";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Box, Stepper, Step, StepLabel, Typography, styled } from '@mui/material';
import Carousel from "./Carousel";
import ItemList from "./ItemList";
import SkeletonUI from "./Skleton";
import useFetchData from "../utils/data";
import { useSelector } from "react-redux";

const DotStepIcon = styled('div')(({ theme }) => ({
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: 'gray'
}));

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

const CustomStepLabel = styled(StepLabel)({
    '& .MuiStepLabel-iconContainer': {
        display: 'block',
    },
});

const renderItem = (item) => {
    return (
        <div className="flex px-2 py-1 border-2 rounded-xl h-[70px] ml-2 gap-2 cursor-pointer">
            <div className="flex p-2 h-[48px] w-[48px] ">
                <img className="object-cover" src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/` + item?.info.offerLogo} />
            </div>
            <div>
                <h3>{item?.info?.header} </h3>
                <h5 className="truncate w-52">{item?.info?.couponCode || item?.info?.description}</h5>
            </div>
        </div>
    )
}

export default function RestrauntDetails() {
    const params = useParams();
    const { isLoading } = useFetchData(process.env.REACT_APP_RESTRAUNT_DETAILS_API + params.id.split("-")[0], params.id.split("-")[0]);

    const restaurantItemDetails = useSelector((state) => state.data.restaurantDetails);
    const onlineRestraunt = restaurantItemDetails?.data?.cards[2]?.card?.card?.info;
    const tabs = restaurantItemDetails?.data?.cards[1].card.card.tabs || [];
    const offers = restaurantItemDetails?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers;
    const [value, setValue] = useState(0);
    const restaurantDetails = restaurantItemDetails?.data?.cards[2].card.card.info;
    const menuItems = restaurantItemDetails?.data?.cards[4]?.groupedCard?.cardGroupMap.REGULAR?.cards;
    const topPick = menuItems && menuItems[1];
    const [translateValue, setTranslateValue] = useState(0);
    const [clicks, setClicks] = useState(0);
    const [remain, setRemain] = useState(0);

    useEffect(() => {
        if (topPick) {
            const length = topPick?.card?.card?.carousel?.length;
            const topPicksDivSW = (length * 400) + (16 * (length - 1));
            const remain = topPicksDivSW - 1100;
            const numbOfClicks = remain / 400;
            setClicks(Math.floor(numbOfClicks));
        }
    }, [topPick])

    if (isLoading) {
        return (
            <>
                <SkeletonUI count={4} />
                <SkeletonUI count={4} />
                <SkeletonUI count={4} />
            </>
        )
    }

    let restaurantLicenseInfo;

    menuItems && menuItems?.forEach(item => {
        let items = item?.card?.card['@type'].split(".")[6] === 'RestaurantLicenseInfo';
        if (items) restaurantLicenseInfo = item?.card?.card;
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleNext = () => {
        if (remain < clicks) {
            setTranslateValue((prev) => prev + 52);
            setRemain((prev) => prev + 1);
        }
    }

    const handlePrev = () => {
        if (remain > 0) {
            setRemain((prev) => prev - 1);
            translateValue <= 0 ? "" : setTranslateValue((prev) => prev - 52);
        }
    }

    return (
        <div className="mt-[108px] restraunt-details">
            <div>
                <span className="font-normal text-xs">Home / {onlineRestraunt && onlineRestraunt.city + " / " + onlineRestraunt.name}</span>
                <h2 className="mt-8 font-bold text-2xl">{onlineRestraunt && onlineRestraunt.name}</h2>
            </div>
            <div>
                <Box sx={{ width: '80%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} >
                            {!isLoading ? tabs.map((item, ind) => (
                                <Tab key={ind} label={item.title} />
                            )) : null}
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <Box sx={{ width: '80%', boxShadow: 3, padding: '1rem', borderRadius: "24px" }}>
                            <Card className="mt-2">
                                <CardContent>
                                    <Typography variant="h7" color="text.secondary" gutterBottom>
                                        <FontAwesomeIcon icon={faStar} color="green" />
                                        {restaurantDetails?.avgRating} ({restaurantDetails?.totalRatingsString}) . {restaurantDetails?.costForTwoMessage}
                                    </Typography>
                                    <Typography variant="h7" component="p" color={orange[900]}>
                                        {restaurantDetails?.cuisines.join(", ")}
                                    </Typography>
                                    <Box sx={{ maxWidth: 400 }}>
                                        <Stepper orientation="vertical">
                                            {["Outlet " + restaurantDetails?.locality, restaurantDetails?.sla.slaString].map((step, index) => (
                                                <Step key={index}>
                                                    <CustomStepLabel StepIconComponent={DotStepIcon}>
                                                        {step}
                                                    </CustomStepLabel>
                                                </Step>
                                            ))}
                                        </Stepper>
                                    </Box>
                                    <hr className="divider mb-4" />
                                    <Typography >
                                        <FontAwesomeIcon icon={faBicycle} />
                                        <span className="ml-2">{restaurantDetails?.sla?.lastMileTravelString} | ₹ {restaurantDetails?.feeDetails.totalFee / 100} Delivery fee will apply</span>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        Item Two
                    </CustomTabPanel>
                </Box>
            </div>

            <div>
                <h2 className="font-bold text-xl"> Deals for you</h2>
                <Carousel slides={offers} renderItem={renderItem} slideToShow={3} />
            </div>

            <div className="mt-16">
                <h2 className="my-16 text-center font-bold"> Menu </h2>
                {topPick &&
                    <div className="w-full m-auto overflow-hidden top-picks">
                        <div className="mt-8 text-xl font-bold flex justify-between">
                            <h1 className="mb-4">{topPick?.card?.card?.title}</h1>
                            <div className="flex gap-2">
                                <button disabled={!(remain > 0)}>
                                    <FontAwesomeIcon color={`${(!remain > 0) ? 'gray' : 'black'}`} onClick={handlePrev} icon={faArrowAltCircleLeft} />
                                </button>
                                <button disabled={remain === clicks}>
                                    <FontAwesomeIcon color={`${remain === clicks ? 'gray' : 'black'}`} onClick={handleNext} icon={faArrowAltCircleRight} />
                                </button>
                            </div>
                        </div>
                        <div style={{ translate: `-${translateValue}%` }} className="flex gap-4 w-full duration-500">
                            {topPick?.card?.card?.carousel?.map((item) => (
                                <div key={item.creativeId} className="min-w-[400px] relative h-[400px]">
                                    <img className="w-full h-full" src={process.env.REACT_APP_TOP_PICKS_BANNER + item.creativeId} alt="" />
                                </div>
                            ))}
                        </div>
                    </div>
                }
                {menuItems && menuItems.slice(2).map((item, i) => (
                    <ItemList key={i} item={item} index={i} />
                ))}
            </div>
            <div className="bg-[#f1f1f6] h-[400px]">
                <img className="h-[40px] w-[80px]" src={process.env.REACT_APP_API_URL + restaurantLicenseInfo?.imageId} />
                <h3>{restaurantLicenseInfo?.type} </h3>

            </div>

        </div>
    )
}