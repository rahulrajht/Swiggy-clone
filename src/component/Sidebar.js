import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Circle, LocationCity } from '@mui/icons-material';
import { faLocationDot, faLocationPin } from '@fortawesome/free-solid-svg-icons';
import useFetchData from '../utils/data';
import { useDispatch } from 'react-redux';
import { fetchCoordinate, fetchLocation } from '../store/slices/location';

export default function Sidebar({ isOpen, setLocationPanel }) {
  const [locationName, setLocationName] = useState("");
  const [locationArray, setLocation] = useState([]);
  const dispatch = useDispatch();
  function handleOnChange(e) {
    setLocationName(e.target.value);
  }

  async function handleLocationChange(location) {
    const res = await axios.get(process.env.REACT_APP_LOCATION_SEARCH+location.place_id);
    const coord = {
      lat: res?.data?.data[0].geometry.location.lat,
      lng: res?.data?.data[0].geometry.location.lng
    }
    dispatch(fetchLocation(location))
    dispatch(fetchCoordinate(coord))
    setLocationPanel(false);
    
  }

  useEffect(() => {
    async function fetchLocation() {
      const response = await axios.get(process.env.REACT_APP_LOCATION_ENDPOINT + locationName);
      setLocation(response.data.data);
    }

    fetchLocation();
  }, [locationName])

  return (
    <Dialog open={isOpen} onClose={() => setLocationPanel(false)} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out"
      />

      <div className="fixed inset-0 overflow-hidden ">
        <div className="absolute inset-0 overflow-hidden ">
          <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full ">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-md transform transition duration-500 ease-in-out mt-[80px]"
              style={{
                transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
              }}
            >

              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                    <div className='flex justify-between items-center'>
                      <input
                        onChange={handleOnChange}
                        id="price"
                        name="price"
                        type="text"
                        placeholder="Enter street name or city name.."
                        value={locationName}
                        className="block font-serif font-medium w-full rounded-md border-0 p-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      {locationName && <XMarkIcon onClick={() => setLocationName("")} aria-hidden="true" className="h-6 w-6 absolute right-10" />}
                    </div>
                  </DialogTitle>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {
                    locationArray && locationArray.map((item) => (
                      <div onClick={()=>handleLocationChange(item)} className='flex mt-1 p-2 items-start font-serif hover:cursor-pointer'>
                        <div>
                          <FontAwesomeIcon icon={faLocationDot} />
                        </div>
                        <div className='ml-4  w-screen'>
                          <div className='font-medium text-[#282c3f]'>{item.structured_formatting.main_text}</div>
                          <span className='font-light text-sm text-[#93959f] divide-y-2 divide-dashed'>{item.structured_formatting.secondary_text}</span>
                          <hr className='location mt-4' />
                        </div>

                      </div>
                    ))
                  }
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
