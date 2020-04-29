import axios from "axios";

export const getAddress = cep => {
  const url = `http://cep.la/${cep}`;

  return axios.get(url, {
    headers: {
      Accept: "application/json"
    }
  });
};
