import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faStar } from '@fortawesome/free-solid-svg-icons';

export default function AccordinItemList({ item }) {
    return (
        <Accordion defaultExpanded={item?.card?.card?.title === 'Recommended' ? true : false}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <Typography>{item?.card?.card?.title} ({itemCards?.length})</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {itemCards &&
                    itemCards.map((item) => (
                        <div className='flex justify-around w-full pb-8 rounded-lg my-8 item-list border-b border-0.5 border-lightgray rounded-none last:border-b-0'>
                            <div className='w-8/12'>
                                <h2 className='font-bold text-lg'>{item?.card?.info?.name}</h2>
                                <p className='font-[600] '>₹ {item?.card?.info?.price ? (item?.card?.info?.price / 100) : (item?.card?.info?.defaultPrice && (item?.card?.info?.defaultPrice / 100))} {item?.card?.info?.offerTags && <span className='text-xs text-[black] ml-2 '><FontAwesomeIcon icon={faGift} /> {item?.card?.info?.offerTags[0].title} {item?.card?.info?.offerTags[0].subTitle} </span>} </p>
                                <p><FontAwesomeIcon icon={faStar} color='green' /> <span className='text-[#1b4e02]'>{item?.card?.info?.ratings?.aggregatedRating?.rating || "Ratings not available"} </span>({item?.card?.info?.ratings?.aggregatedRating?.ratingCount || item?.card?.info?.ratings?.aggregatedRating?.ratingCountV2 || 0})</p>
                                <p className=''>{item?.card?.info?.description}</p>
                            </div>
                            <div className='shadow-md  md:shadow-lg rounded-xl grid place-items-center relative'>
                                <img className='object-cover rounded-xl h-[180px] sm:h-[180px] md:h-[200px]' src={process.env.REACT_APP_API_URL + item?.card?.info?.imageId} />
                                <button className='cursor-pointer transition-colors duration-500 hover:bg-gray-200 border-none text-[green] bg-white bottom-[-15px]  border-2 rounded-xl px-8 py-1 absolute'> Add </button>
                            </div>
                        </div>
                    ))
                }
            </AccordionDetails>
        </Accordion>
    )

}