import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (url, method = 'GET', payload = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (method === 'POST' && payload) {
          response = await axios.post(url, payload, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
        } else {
          response = await axios.get(url);
        }
        setData(response.data);
      } catch (err) {
        setError(err.message || 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, method, payload]);

  return { data, loading, error };
};

export default useFetch;
