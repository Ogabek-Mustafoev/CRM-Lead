import qs from "qs";

export const queryBuilder = (url, config = {}) => {
  if (Object.keys(config).length <= 0) return url;
  const s = qs.stringify(config, { encodeValuesOnly: true });
  const queryObj = new URLSearchParams(s);
  return `${url}?${decodeURIComponent(queryObj.toString())}`;
};
