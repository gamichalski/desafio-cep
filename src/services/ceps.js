export function getCeps(filter) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", `http://cep.la/${filter}`, true);
  xhr.setRequestHeader("Accept", "application/json");

  return xhr;
}
