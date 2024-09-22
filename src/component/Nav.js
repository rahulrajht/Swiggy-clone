import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping , faUser, faSearch, faChevronDown , faQuestionCircle , faGifts} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Sidebar from './Sidebar';
export default function Nav() {

  const [locationPanel , setLocationPanel] = useState(false);
  function showLocationPanel () {
    setLocationPanel((prev) => !prev)
  }

  const cart = useSelector((store)=> store.cart.items);
  const location = useSelector((store)=> store.location.currentLocation);

  return (
    <div className="flex justify-around w-full h-[80px] items-center px-8 fixed top-0 p-4 shadow-md z-[100] bg-white">
      <ul className="flex sm:w-screen md:w-3/4 items-center">
        <li className="mt-2 p-2">
          <img className="w-[80px] md:ml-4" src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" />
        </li>
        <li className='flex w-screen items-center'>{location ? location?.structured_formatting.main_text :"Bengalure, India "} <FontAwesomeIcon  className="mr-4" icon={faChevronDown} onClick={showLocationPanel}/></li>
      </ul>
      <ul className="md:flex justify-between w-1/3 mr-4">
        <li> <FontAwesomeIcon  className="mr-2" icon={faSearch} />Search</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faGifts} />Offers</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faQuestionCircle} />Helps</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faUser} />Sign In</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faCartShopping} />Cart {cart.length}</li>
      </ul>

      {showLocationPanel && <div className=''>
         <Sidebar isOpen={locationPanel} setLocationPanel={setLocationPanel}/>
      </div>}
    </div>
  )
}
