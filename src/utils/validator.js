const messages = {
  maxLength: ({ max }) => {
    return `Tamanho máximo é de ${max} caracteres`;
  },
  minLength: ({ min }) => {
    return `Tamanho mínimo é de ${min} caracteres`;
  },
  numeric: "São aceitos apenas números"
};

export const getErrorMessage = validation => {
  const params = Object.keys(validation.$params);

  return params
    .filter(param => !validation[param])
    .map(param => {
      const error = messages[param];

      if (typeof error === "function") {
        return error(validation.$params[param]);
      }

      return error;
    });
};
