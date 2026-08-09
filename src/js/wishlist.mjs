import { getAPISearchResults } from "./search.mjs";
import { setLocalStorage, getLocalStorage } from "./storage.mjs";
import { updateResultsPage } from "./media.mjs";

// If there are stored results, you can use them to update the results page
let storedWishlist = getLocalStorage("wishlist");

let page = 0;
const resultsPerPage = 9;
let contentBox = document.getElementById("wishlist-boxes");
let result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage);
// pagination

const search_nav_l = document.getElementById("wishlist-nav-l");
const search_nav_r = document.getElementById("wishlist-nav-r");

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
        result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage);
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
        result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage);
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



