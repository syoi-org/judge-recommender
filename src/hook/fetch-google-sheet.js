import { useState, useEffect } from 'react';
import * as axios from 'axios';

function useFetchGoogleSheet(url, initialState, postprocess) {
  const [data, setData] = useState(initialState);

  let source = null;
  const google = {
    visualization: {
      Query: {
        setResponse: (response) => {
          source = response;
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      const result = await axios(url);
      eval(result.data);
      setData(postprocess(source));
    })();
  }, []);

  return data;
}

export default useFetchGoogleSheet;