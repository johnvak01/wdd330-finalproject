import { setLocalStorage, getLocalStorage } from "./storage.mjs";




export function updateResultsPage(contentBox, mediaList, page = 0, resultsPerPage = 3, draggable = false) {
    contentBox.innerHTML = "";
    let totalboxes = 0;
    let displayedboxes = 0;
    mediaList.forEach((media) => {
        // make the Box
        const mediaBox = createMediaBox(media.id, media.type, media.title, media.description, media.posterPath, media.runtime, media.releaseDate, media.producers, media.genres);
        //deisplay the box if in range 
        totalboxes++;
        console.log("page", page, "resultsPerPage", resultsPerPage, "totalboxes", totalboxes);
        if (totalboxes <= resultsPerPage * (page + 1) && totalboxes > resultsPerPage * page) {
            console.log("displaying box", mediaBox.dataset.id);
            mediaBox.classList.remove('undisplayed');
            displayedboxes++;
        }
        //make draggable of toggled to yes
        if (draggable) { 
            const handle = mediaBox.querySelector('.media-handle')
            handle.classList.remove('undisplayed');
            handle.addEventListener('mousedown', (event) => {
                mediaBox.setAttribute('draggable', true);
            });
            handle.addEventListener('mouseup', (event) => {
                mediaBox.setAttribute('draggable', false);
            });
        }
        // append box
        contentBox.appendChild(mediaBox);
    });
    while (displayedboxes < resultsPerPage) {
        const placeholderBox = CreateEmptyMediaBox("No more results");
        contentBox.appendChild(placeholderBox);
        displayedboxes++;
        console.log("+")

    }
    // update pagination
    return totalboxes;
}


function createMediaBox(id, type, title, description, posterPath, runtime, releaseDate, producers, genres) {
    const mediaBox = document.createElement('div');
    mediaBox.classList.add('media-box', "undisplayed");
    
    mediaBox.dataset.id = id;
    mediaBox.dataset.type = type;

    const w_add = document.createElement('div');
    const w_remove = document.createElement('div');

    w_add.classList.add('watchlist-modify', 'add', 'undisplayed');
    w_add.textContent = '+';
    w_remove.classList.add('watchlist-modify', 'remove','undisplayed');
    w_remove.textContent = '-';

    let currentWishlist = getLocalStorage("wishlist");
    if (currentWishlist.some(item => item.id === id)) {
        w_add.classList.add('undisplayed');
        w_remove.classList.remove('undisplayed');
    }else{
        w_add.classList.remove('undisplayed');
        w_remove.classList.add('undisplayed');
    }

    w_add.addEventListener('click', (event) => {
        event.preventDefault;
        let currentWishlist = getLocalStorage("wishlist");
        if (!currentWishlist.some(item => item.id === id)) {

            currentWishlist.push(
                {
                    id: id,
                    type: type,
                    title: title,
                    description: description,
                    posterPath: posterPath,
                    runtime: runtime,
                    releaseDate: releaseDate,
                    producers: producers,
                    genres: genres
                }
            );
            setLocalStorage("wishlist", currentWishlist);
            w_add.classList.add('undisplayed');
            w_remove.classList.remove('undisplayed');
        }
    });
    w_remove.addEventListener('click', (event) => {
        event.preventDefault;
        let currentWishlist = getLocalStorage("wishlist");
        currentWishlist = currentWishlist.filter(item => item.id !== id);
        setLocalStorage("wishlist", currentWishlist);
        w_add.classList.remove('undisplayed');
        w_remove.classList.add('undisplayed');
    });

    const el_handle = document.createElement('div');
    el_handle.classList.add('media-handle', 'undisplayed');
    el_handle.textContent = "☰";
    el_handle.title = "Drag to reorder";

    const el_title = document.createElement('h2');
    el_title.textContent = title || "No title available";
    el_title.classList.add('media-title');
    const el_description = document.createElement('p');
    el_description.textContent = description || "No description available";
    el_description.classList.add('media-description');
    const el_poster_path = document.createElement('img');
    if (type === 'podcast') {
        el_poster_path.src = posterPath;
    }
    else if (type === 'movie') {
        el_poster_path.src = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    }
    el_poster_path.classList.add('media-image');
    // el_poster_path.style.width = '250px';
    el_poster_path.alt = `${title || "missing"} poster`;
    el_poster_path.classList.add('media-image');
    const el_runtime = document.createElement('p');
    el_runtime.textContent = `Runtime: ${runtime||"unknown"} minutes`;
    el_runtime.classList.add('media-duration');
    const el_release_date = document.createElement('p');
    el_release_date.textContent = releaseDate || "unknown";
    el_release_date.classList.add('media-release-date');
    const el_producers = document.createElement('p');
    el_producers.textContent = producers || "unknown";
    el_producers.classList.add('media-producers');
    const el_genres = document.createElement('p');
    el_genres.textContent = genres || "unknown";
    el_genres.classList.add('media-genres');

    mediaBox.append(w_add, w_remove, el_title, el_handle, el_runtime, el_description, el_poster_path, el_release_date, el_producers, el_genres);

    return mediaBox;
}

function CreateEmptyMediaBox(placeholderText = "") {
    const mediaBox = document.createElement('div');
    mediaBox.classList.add('media-box', 'media-box-placeholder', "placeholder");
    mediaBox.dataset.type = "placeholder";

    const text = document.createElement('span');
    text.textContent = placeholderText;

    mediaBox.append(text);

    return mediaBox;
}