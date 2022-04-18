import { useState, useEffect } from "react";

export const useRemoteGetCall = (endpoint) => {
  const [response, setResponse] = useState();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const invokeRemoteApi = async () => {
      try {
        if (endpoint) {
          const httpResponse = await fetch(endpoint);
          if (!httpResponse.ok || httpResponse.status !== 200) {
            console.log("Remote call status code : " + httpResponse.status);
            throw new Error(
              httpResponse.status + "::" + httpResponse.statusText
            );
          }
          const responseData = await httpResponse.json();
          setResponse(responseData);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(`Error ${error}`);
        setServerError(error);
        setIsLoading(false);
      }
    };
    invokeRemoteApi();
  }, [endpoint]);
  return { isLoading, response, serverError };
};

export const useRemotePostCall = (entpoint, requestOptions) => {
  const [response, setResponse] = useState();
  const [serverError, setServerError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const submitToRemote = async () => {
      try {
        const httpResponse = await fetch(entpoint, requestOptions);
        if (!httpResponse.ok || httpResponse.status !== 200) {
          console.log("Remote call status code : " + httpResponse.status);
          throw new Error(httpResponse.status + "::" + httpResponse.statusText);
        }
        const responseData = await httpResponse.json();
        setResponse(responseData);
        setIsLoading(false);
      } catch (error) {
        console.error(`Error ${error}`);
        setServerError(error);
        setIsLoading(false);
      }
    };
    submitToRemote();
  }, [entpoint, requestOptions]);
  return { isLoading, response, serverError };
  // fetch(entpoint, requestOptions)
  // .then((response) => console.log("Submitted successfully"))
  // .catch((error) => console.log("Form submit error", error));
};
