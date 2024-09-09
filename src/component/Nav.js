import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping , faUser, faSearch, faChevronDown , faQuestionCircle , faGifts} from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
export default function Nav() {

  const cart = useSelector((store)=> store.cart.items);
  return (
    <div className="flex justify-around w-full h-[80px] items-center px-8 fixed bg-white top-0 p-4 shadow-md z-[100] bg-white">
      <ul className="flex w-3/4 items-center">
        <li className="mt-2 p-2">
          <img className="w-[80px] ml-4" src="https://1000logos.net/wp-content/uploads/2021/05/Swiggy-emblem.png" />

        </li>
        <li>Bengalure, India <FontAwesomeIcon  className="mr-2" icon={faChevronDown} /></li>
      </ul>
      <ul className="flex justify-between w-1/3 mr-4">
        <li> <FontAwesomeIcon  className="mr-2" icon={faSearch} />Search</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faGifts} />Offers</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faQuestionCircle} />Helps</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faUser} />Sign In</li>
        <li><FontAwesomeIcon  className="mr-2" icon={faCartShopping} />Cart {cart.length}</li>
      </ul>
    </div>
  )
}
