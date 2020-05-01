import axios from "axios";

export const searchCep = cep => {
  const header = {
    headers: { Accept: "application/json" }
  };
  const url = `http://cep.la/${cep}`;

  return axios.get(url, header);
};
