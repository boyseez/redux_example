export function getApi() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((json) => json);
  //.catch((err) => console.log(err));
}
