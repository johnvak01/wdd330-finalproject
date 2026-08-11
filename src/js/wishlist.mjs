import { setLocalStorage, getLocalStorage } from "./storage.mjs";
import { updateResultsPage } from "./media.mjs";
import { addDraggableEvent, setDraggable } from "./draggable.mjs";

let storedWishlist = getLocalStorage("wishlist");
let page = 0;
const resultsPerPage = 9;
let contentBox = document.getElementById("wishlist-boxes");
let result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage, true);
// pagination

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
        result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage, true);
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
        result_total = updateResultsPage(contentBox, storedWishlist, page, resultsPerPage, true);
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

// draggable js

const draggables = document.querySelectorAll('.media-box');
setDraggable(draggables, storedWishlist, "wishlist");

const container = document.querySelector('.media-boxes');
addDraggableEvent(container);


