import axios from "axios";

export const fetcher = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
