import axios from "axios";

export const getCep = filter => {
  const url = `http://cep.la/${filter}`;
  return axios.get(url, { headers: { accept: "application/json" } });
};
