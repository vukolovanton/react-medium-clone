import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useLocalStorage from './useLocalStorage'

export default url => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});

  const [token] = useLocalStorage('token');

  const baseUrl = "https://conduit.productionready.io/api";
  

//Здесь options - Это то, что получаем снаружи, из компонента Auth
  const doFetch = useCallback((options = {}) => {
      //Используем еще одну переменную, чтобы полученные данные сохранить, а затем передать в axios
      setOptions(options);
      setIsLoading(true);
  }, []);

  useEffect(() => {
      const requestOptions = {
          ...options,
          ...{
              headers: {
                  authorization: token ? `Token ${token}` : ''
              }
          }
      }
    if (!isLoading) {
      return;
    }

    axios(baseUrl + url, requestOptions)
      .then(response => {
        console.log("success", response);
        setIsLoading(false);
        setResponse(response.data);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
        setError(err.response.data);
      });
  }, [isLoading, options, url, token]);

  return [{ isLoading, response, error }, doFetch];
};
