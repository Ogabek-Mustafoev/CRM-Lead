import { isFunction, get } from "lodash";

import { httpClient } from "./index.js";
import { toast } from "react-toastify";
import { queryBuilder } from "./query-builder.js";

export function ErrorHandle(statusCode) {
  switch (statusCode) {
    case 400:
      toast.error("Bad Request: The server received an invalid request.");
      break;
    case 403:
      toast.error(
        "Forbidden: You do not have permission to access this resource."
      );
      break;
    case 413:
      toast.error("Fayl hajmi 5MB dan kichik bo'lishi kerak!");
      break;
    default:
      // statusCode && toast.error(`${statusCode}`);
  }
}
const ultimateQueryFn = (customQueryFn, Params) =>
  customQueryFn ? customQueryFn : (context) => queryFn(context, Params);

const dataSelect = (data = {}, dataKey) =>
  isFunction(dataKey) ? dataKey(data) : get(data, dataKey);

const metaSelect = (data = {}, metaKey) =>
  isFunction(metaKey) ? metaKey(data) : get(data, metaKey);

const getQueryKey = (method, url, Params) => {
  return Params ? [method, url, Params] : [method, url];
};

async function queryFn(context, urlSearchParams = {}) {
  const { queryKey, signal } = context;

  const url = queryBuilder(queryKey[1], urlSearchParams);
  return await httpClient({
    method: queryKey[0],
    url,
    signal,
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const statusCode = err?.response?.status;
      ErrorHandle(statusCode);
      throw new Error(err);
    });
}

export const apiHelpers = {
  ultimateQueryFn,
  dataSelect,
  metaSelect,
  getQueryKey,
};
