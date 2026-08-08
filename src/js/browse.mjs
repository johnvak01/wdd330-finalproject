import { getAPISearchResults } from "./search.mjs";
import { setLocalStorage, getLocalStorage } from "./storage.mjs";

// If there are stored results, you can use them to update the results page
let storedResults = getLocalStorage("searchResults");
console.log("stored results:", storedResults);
// updateResultsPage(contentBox, storedResults);

// code for the search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", async () => {
    const query = searchInput.value.trim();
    if (query) {
        let searchResults = await getAPISearchResults(query);
        setLocalStorage("searchResults", searchResults);
        //update the results page with the new search results
        // updateResultsPage(contentBox, searchResults);
    }
});