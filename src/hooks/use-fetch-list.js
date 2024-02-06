import {useQuery} from "@tanstack/react-query";
import {apiHelpers} from "@/utils";

export const useFetchList = ({
                               url,
                               dataKey = "data",
                               customQueryFn,
                               queryOptions = {},
                               Params = {},
                             }) => {
  const params = {...Params};
  const query = useQuery(
    apiHelpers.getQueryKey("GET", url, params),

    apiHelpers.ultimateQueryFn(customQueryFn, params),

    {
      select: (responseData) => {
        if (responseData?.data?.length) {
          return apiHelpers.dataSelect(responseData, dataKey);
        } else {
          const data = {data: responseData};
          return apiHelpers.dataSelect(data, dataKey);
        }
      },

      ...queryOptions,
    }
  );

  return {
    ...query,
  };
};
