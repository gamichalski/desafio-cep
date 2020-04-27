import axios from "axios";

export const getCepInfo = search => {
  const url = `http://cep.la/${search}`;
  console.log(url);
  return axios.get(url, { headers: { accept: "application/json" } });
};
