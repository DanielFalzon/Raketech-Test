import {useEffect, useState} from 'react'
import axios from 'axios'

export function useAxiosGet(url) {
  //Custom hook utilised when making axios requests. Keeps component code cleaner.
    const [request, setRequest] = useState({
        loading: false,
        data: null,
        error: false,
      });

      useEffect(() => {
        setRequest({
          loading: true,
          data: null,
          error: false,
        });
        axios
          .get(url)
          .then((response) => {
            setRequest({
              loading: false,
              data: response.data,
              error: false,
            });
          })
          .catch((e) => {
            let errMsg
            if(e.response){
              errMsg = e.response.data
            } else {
              errMsg = {error: "no connection with API"}
            }
            setRequest({
              loading: false,
              data: errMsg,
              error: true,
            });
          });
      }, [url]);

    return request
}

