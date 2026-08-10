import { setLocalStorage, getLocalStorage } from "./storage.mjs";
import { updateResultsPage } from "./media.mjs";
import { getAPISearchResults } from "./search.mjs";
import { TimeLine } from "./timeline.mjs";


// Wishlist Update
let storedWishlist = getLocalStorage("wishlist");

let pageWishlist = 0;
const resultsPerPageWishlist = 3;
let contentBox = document.getElementById("wishlist-boxes");
let result_total = updateResultsPage(contentBox, storedWishlist, pageWishlist, resultsPerPageWishlist, false, true);
// wishlist Pagination
const wishlist_nav_l = document.getElementById("wishlist-nav-l");
const wishlist_nav_r = document.getElementById("wishlist-nav-r");

wishlist_nav_l.classList.add("hidden");
wishlist_nav_r.classList.add("hidden");

if (pageWishlist > 0) {
    wishlist_nav_l.classList.remove("hidden");
}
else {
    wishlist_nav_l.classList.add("hidden");
}
if (result_total > resultsPerPageWishlist * (pageWishlist + 1)) {
    wishlist_nav_r.classList.remove("hidden");
} else {
    wishlist_nav_r.classList.add("hidden");
}

wishlist_nav_l.addEventListener("click", (event) => {
    event.preventDefault();
    if (pageWishlist > 0) {
        pageWishlist--;
        result_total = updateResultsPage(contentBox, storedWishlist, pageWishlist, resultsPerPageWishlist, false,true);
        setDraggable(document.querySelectorAll('.media-box'));
    }
    if (pageWishlist > 0) {
        wishlist_nav_l.classList.remove("hidden");
    }
    else {
        wishlist_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPageWishlist * (pageWishlist + 1)) {
        wishlist_nav_r.classList.remove("hidden");
    } else {
        wishlist_nav_r.classList.add("hidden");
    }
});

wishlist_nav_r.addEventListener("click", (event) => {
    event.preventDefault();
    if (result_total > resultsPerPageWishlist * (pageWishlist + 1)) {
        pageWishlist++;
        result_total = updateResultsPage(contentBox, storedWishlist, pageWishlist, resultsPerPageWishlist, false,true);
        // setDraggable(document.querySelectorAll('.media-box'));
    }
    if (pageWishlist > 0) {
        wishlist_nav_l.classList.remove("hidden");
    }
    else {
        wishlist_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPageWishlist * (pageWishlist + 1)) {
        wishlist_nav_r.classList.remove("hidden");
    } else {
        wishlist_nav_r.classList.add("hidden");
    }
});
// Search Update
let storedResults = getLocalStorage("searchResults");
console.log("stored results:", storedResults);

let pageSearch = 0;
let resultsPerPageSearch = 3;

let contentBoxSearch = document.getElementById("search-results");
let searchResultTotal = updateResultsPage(contentBoxSearch, storedResults, pageSearch, resultsPerPageSearch, false, true);
// pagination

const search_nav_l = document.getElementById("search-nav-l");
const search_nav_r = document.getElementById("search-nav-r");


search_nav_l.classList.add("hidden");
search_nav_r.classList.add("hidden");

if (pageSearch > 0) {
    search_nav_l.classList.remove("hidden");
}
else {
    search_nav_l.classList.add("hidden");
}
if (result_total > resultsPerPageSearch * (pageSearch + 1)) {
    search_nav_r.classList.remove("hidden");
} else {
    search_nav_r.classList.add("hidden");
}

search_nav_l.addEventListener("click", (event) => {
    event.preventDefault();
    if (pageSearch > 0) {
        pageSearch--;
        console.log("prior page", pageSearch);
        result_total = updateResultsPage(contentBoxSearch, storedResults, pageSearch, resultsPerPageSearch, false, true);
    }
    if (pageSearch > 0) {
        search_nav_l.classList.remove("hidden");
    }
    else {
        search_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPageSearch * (pageSearch + 1)) {
        search_nav_r.classList.remove("hidden");
    } else {
        search_nav_r.classList.add("hidden");
    }
});

search_nav_r.addEventListener("click", (event) => {
    console.log("next page", pageSearch);
    event.preventDefault();
    if (result_total > resultsPerPageSearch * (pageSearch + 1)) {
        pageSearch++;
        result_total = updateResultsPage(contentBoxSearch, storedResults, pageSearch, resultsPerPageSearch, false, true);
    }
    if (pageSearch > 0) {
        search_nav_l.classList.remove("hidden");
    }
    else {
        search_nav_l.classList.add("hidden");
    }
    if (result_total > resultsPerPageSearch * (pageSearch + 1)) {
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
        pageSearch = 0;
        search_nav_l.classList.add("hidden");
        search_nav_r.classList.remove("hidden");

        //update the results page with the new search results
        result_total = updateResultsPage(contentBoxSearch, storedResults, pageSearch, resultsPerPageSearch, false, true);
    }
});

// code for timeline management
let timeline = new TimeLine(0,0,[]);

