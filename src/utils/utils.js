export function textValidate(value) {
  if (value) {
    return true;
  }

  return "";
}

export const ctrlA = event => {
  if (event.ctrlKey && event.keyCode == 65) {
    return true;
  }

  return false;
};

export const ctrlC = event => {
  if (event.ctrlKey && event.keyCode == 67) {
    return true;
  }

  return false;
};

export const ctrlV = event => {
  if (event.ctrlKey && event.keyCode == 86) {
    return true;
  }

  return false;
};
