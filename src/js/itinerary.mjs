import { setLocalStorage, getLocalStorage } from "./storage.mjs";
import { updateResultsPage } from "./media.mjs";
import { getAPISearchResults } from "./search.mjs";
import { TimeLine } from "./timeline.mjs";


// Wishlist Update
let storedWishlist = getLocalStorage("wishlist");

let page = 0;
const resultsPerPage = 3;
let contentBox = document.getElementById("wishlist-boxes");
let result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage, false, true);
// wishlist Pagination
const wishlist_nav_l = document.getElementById("wishlist-nav-l");
const wishlist_nav_r = document.getElementById("wishlist-nav-r");

wishlist_nav_l.classList.add("hidden");
wishlist_nav_r.classList.add("hidden");

if (page > 0) {
    wishlist_nav_l.classList.remove("hidden");
}
else {
    wishlist_nav_l.classList.add("hidden");
}
if (result_total > resultsPerPage * (page + 1)) {
    wishlist_nav_r.classList.remove("hidden");
} else {
    wishlist_nav_r.classList.add("hidden");
}

wishlist_nav_l.addEventListener("click", (event) => {
    event.preventDefault();
    if (page > 0) {
        page--;
        result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage, false,true);
        setDraggable(document.querySelectorAll('.media-box'));
    }
    if (page > 0) {
        wishlist_nav_l.classList.remove("hidden");
    }
    else {
        wishlist_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPage * (page + 1)) {
        wishlist_nav_r.classList.remove("hidden");
    } else {
        wishlist_nav_r.classList.add("hidden");
    }
});

wishlist_nav_r.addEventListener("click", (event) => {
    event.preventDefault();
    if (result_total > resultsPerPage * (page + 1)) {
        page++;
        result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage, false,true);
        setDraggable(document.querySelectorAll('.media-box'));
    }
    if (page > 0) {
        wishlist_nav_l.classList.remove("hidden");
    }
    else {
        wishlist_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPage * (page + 1)) {
        wishlist_nav_r.classList.remove("hidden");
    } else {
        wishlist_nav_r.classList.add("hidden");
    }
});
// Search Update
let storedResults = getLocalStorage("searchResults");
console.log("stored results:", storedResults);


let contentBoxSearch = document.getElementById("search-results");
let searchResultTotal = updateResultsPage(contentBoxSearch, storedResults, page, resultsPerPage, false, true);
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
        result_total = updateResultsPage(contentBoxSearch, storedResults, page, resultsPerPage, false, true);
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
        result_total = updateResultsPage(contentBoxSearch, storedResults, page, resultsPerPage, false, true);
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
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        storedResults = await getAPISearchResults(query);
        setLocalStorage("searchResults", storedResults);
        page = 0;
        search_nav_l.classList.add("hidden");
        search_nav_r.classList.remove("hidden");

        //update the results page with the new search results
        result_total = updateResultsPage(contentBoxSearch, storedResults, page, resultsPerPage, false, true);
    }
});

// code for timeline management
let timeline = new TimeLine(0,0,[]);

