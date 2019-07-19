import { useState, useEffect } from 'react';
import * as axios from 'axios';
import sheetToEntry from '../util/sheet-to-entry';

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
      console.log(source);
      const entries = sheetToEntry(source);
      setData(postprocess(entries));
    })();
  }, []);

  return data;
}

export default useFetchGoogleSheet;