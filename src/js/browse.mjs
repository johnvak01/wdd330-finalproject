import { getAPISearchResults } from "./search.mjs";

let searchResults = await getAPISearchResults("dog");
console.log(searchResults);