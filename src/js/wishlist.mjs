import { setLocalStorage, getLocalStorage } from "./storage.mjs";
import { updateResultsPage } from "./media.mjs";

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
setDraggable(draggables);

const container = document.querySelector('.media-boxes');

function setDraggable(draggables) {
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', () => {
            draggable.classList.add('dragging');
            console.log(draggable, "dragging");
        });
        draggable.addEventListener('dragend', () => {
            draggable.classList.remove('dragging');

            let newWishlistOrder = [];
            const updatedDraggables = document.querySelectorAll('.media-box');
            updatedDraggables.forEach(draggable => {
                const id = draggable.dataset.id;
                const type = draggable.dataset.type;
                newWishlistOrder.push(`${id}-${type}`);
            });

            console.log("newWishlistOrder", newWishlistOrder);
            const orderMap = new Map(newWishlistOrder.map((id, index) => [id, index]));

            storedWishlist = storedWishlist.sort((a, b) => {
                const indexA = orderMap.has(`${a.id}-${a.type}`) ? orderMap.get(`${a.id}-${a.type}`) : targetOrder.length;
                const indexB = orderMap.has(`${b.id}-${b.type}`) ? orderMap.get(`${b.id}-${b.type}`) : targetOrder.length;
                return indexA - indexB;

            }
            );
            console.log("storedWishlist", storedWishlist);
            setLocalStorage("wishlist", storedWishlist);
        });
    });
}

container.addEventListener('dragover', e => {
    e.preventDefault();
    // const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector('.dragging');
    const dragAfterElement = getDragAfterElement(container, e.clientY, e.clientX);
    if (dragAfterElement == null) {
        container.appendChild(draggable);
    } else {
        container.insertBefore(draggable, dragAfterElement);
    }
});

function getDragAfterElement(container, y, x) {
    const draggableElements = [...container.querySelectorAll('.media-box:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const yOffset = y - box.top - box.height / 2;
        const xOffset = x - box.left - box.width / 2;
        const offsetTotal = xOffset * xOffset + yOffset * yOffset;

        if (offsetTotal < closest.offsetDefault) {
            return { offsetDefault: offsetTotal, element: child };
        } else {
            return closest;
        }
    },
        { offsetDefault: Number.POSITIVE_INFINITY, element: null }
    ).element;
}

