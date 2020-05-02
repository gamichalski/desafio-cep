import axios from "axios";

export const searchCep = inputCep => {
  var config = {
    headers: { accept: "application/json" }
  };
  const url = `http://cep.la/${inputCep}`;
  return axios.get(url, config);
};
