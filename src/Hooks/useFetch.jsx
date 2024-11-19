import { useState, useEffect } from 'react';

export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setIsLoading(true);
    setError(null);
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, isLoading, error, refetch: fetchData };
}
