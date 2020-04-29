export const formatCep = cep => {
  if (cep.length === 8) {
    return `${cep.slice(0, 5)}-${cep.slice(5, 8)}`;
  }
};
