// retrieve data from localstorage
export function getLocalStorage(key) {
    console.log("getting local storage for key:", key);
    return JSON.parse(localStorage.getItem(key)) || [];
}
// save data to local storage
export function setLocalStorage(key, data) {
    console.log("setting local storage for key:", key, "with data:", data);
  localStorage.setItem(key, JSON.stringify(data));
}
