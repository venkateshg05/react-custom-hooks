import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const httpRequestHandler = useCallback(
    async (fetchUrl, fetchConfig, transformData) => {
      setIsLoading(true);
      setError(null);
      let data = null;
      try {
        const response = await fetch(fetchUrl, fetchConfig);

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        data = await response.json();
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);

      transformData(data);
    },
    []
  );
  return {
    isLoading,
    error,
    httpRequestHandler,
  };
};

export default useHttp;
