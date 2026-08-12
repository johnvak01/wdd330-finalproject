import { getAPISearchResults } from "./search.mjs";
import { setLocalStorage, getLocalStorage } from "./storage.mjs";
import { updateResultsPage } from "./media.mjs";

// If there are stored results, you can use them to update the results page
let storedResults = getLocalStorage("searchResults");
console.log("stored results:", storedResults);

let storedWishlist = getLocalStorage("wishlist");

let page = 0;
const resultsPerPage = 3;
let contentBox = document.getElementById("search-results");
let result_total = updateResultsPage(contentBox, storedResults, page, resultsPerPage);
// pagination

const search_nav_l = document.getElementById("search-nav-l");
const search_nav_r = document.getElementById("search-nav-r");

search_nav_l.classList.add("hidden");
search_nav_r.classList.add("hidden");

if (page > 0) {
    search_nav_l.classList.remove("hidden");
}
else {
    search_nav_l.classList.add("hidden");
}
if (result_total > resultsPerPage * (page + 1)) {
    search_nav_r.classList.remove("hidden");
} else {
    search_nav_r.classList.add("hidden");
}

search_nav_l.addEventListener("click", (event) => {
    event.preventDefault();
    if (page > 0) {
        page--;
        console.log("prior page", page);
        result_total = updateResultsPage(contentBox, storedResults, page, resultsPerPage);
    }
    if (page > 0) {
        search_nav_l.classList.remove("hidden");
    }
    else {
        search_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPage * (page + 1)) {
        search_nav_r.classList.remove("hidden");
    } else {
        search_nav_r.classList.add("hidden");
    }
});

search_nav_r.addEventListener("click", (event) => {
    console.log("next page", page);
    event.preventDefault();
    if (result_total > resultsPerPage * (page + 1)) {
        page++;
        result_total = updateResultsPage(contentBox, storedResults, page, resultsPerPage);
    }
    if (page > 0) {
        search_nav_l.classList.remove("hidden");
    }
    else {
        search_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPage * (page + 1)) {
        search_nav_r.classList.remove("hidden");
    } else {
        search_nav_r.classList.add("hidden");
    }
});
// code for the search functionality
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", async (event) => {
    searchButton.classList.add("search-throbber");
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        storedResults = await getAPISearchResults(query);
        setLocalStorage("searchResults", storedResults);
        page = 0;
        search_nav_l.classList.add("hidden");
        search_nav_r.classList.remove("hidden");

        //update the results page with the new search results
        result_total = updateResultsPage(contentBox, storedResults, page, resultsPerPage);
    }
    searchButton.classList.remove("search-throbber")
});

