import DictionaryApiResult from "@api/types";
import { useState } from "react";

type DictionaryError = {
  message: string;
};



type UseDictionarySearchResult = {
  loading: boolean;
  result: DictionaryApiResult | undefined;
  error: DictionaryError | undefined;
  fetchData: (word: string) => Promise<void>;
};

const useDictionarySearch = (initialeState: any): UseDictionarySearchResult => {
  const [result, setResult] = useState<DictionaryApiResult | undefined>(initialeState[0]);
  const [error, setError] = useState<DictionaryError | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async (word: string) => {
    setLoading(true);  
    if (word.trim() === "") {    
       setResult(undefined)
       setLoading(false)       
    return;
    }
    
    
    try {
      const response = await fetch(`/api/dictionary?word=${word}`);
      const data: any = await response.json();
      if (data.error) {
        throw new Error("No Definitions found");
      } else {
        setResult(data[0]);
        setError(undefined);
        setLoading(false);
      }
    } catch (error: any) {
      setError({ message: "No Definitions found" });
      setLoading(false);
    }
  };

 

  return { result, error, fetchData, loading };
};

export default useDictionarySearch;
