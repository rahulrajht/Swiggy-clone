import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStart, fetchSuccess, fetchFailure, fetchRestaurantDetails } from '../store/slices/dataSlice';

const useFetchData = (url, payload) => {
  const dispatch = useDispatch();
  const { items, restaurantDetails, isLoading, error } = useSelector((state) => state.data);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(fetchStart());
      try {
        const response = await fetch(url);
        const data = await response.json();

        if (payload) {
          dispatch(fetchRestaurantDetails(data));
        } else {
          dispatch(fetchSuccess(data));
        }
      } catch (err) {
        dispatch(fetchFailure(err.toString()));
      }
    };

    if (payload) {
      fetchData();
    } else if (!payload && items.length === 0) {
      fetchData();
    }
  }, [dispatch, url, payload, items.length, restaurantDetails.length]);

  return { items, restaurantDetails, isLoading, error };
};

export default useFetchData;
