import {useState, useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {apiHelpers} from "@/utils";


export const useFetchOne = ({
                              url,
                              dataKey = "data",
                              customQueryFn,
                              method = "GET",
                              queryOptions = {},
                              Params,
                              refetchStatus,
                            }) => {
  const [id, setId] = useState("");


  const single = useQuery(
    apiHelpers.getQueryKey(method, id ? `${url}/${id}` : url, Params),
    apiHelpers.ultimateQueryFn(customQueryFn, Params),

    {
      select: (data) => {
        return data;
      },

      ...queryOptions,
    }
  );

  useEffect(() => {
    if (refetchStatus) single.refetch();
  }, [refetchStatus]);

  return {...single, setId};
};
