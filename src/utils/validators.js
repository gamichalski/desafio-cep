const errorsMessage = {
  maxLength: ({ max }) =>
    `Campo ultrapassou o tamanho maximo de ${max} caracteres`,
  onlyNumbers: "Campo deve possuir somente números"
};

export const getValidatorMessages = validator => {
  const params = Object.keys(validator.$params);
  const errors = params
    .filter(param => !validator[param])
    .map(param => {
      const error = errorsMessage[param];
      if (typeof error === "function") {
        return error(validator.$params[param]);
      }
      return error;
    });
  return errors;
};
