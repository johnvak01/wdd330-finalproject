
export function updateResultsPage(contentBox, searchResults, page = 0, resultsPerPage = 3) {
    contentBox.innerHTML = "";
    let totalboxes = 0;
    let displayedboxes = 0;
    searchResults.forEach((media) => {
        // make the Box
        const mediaBox = createMediaBox(media.id, media.type, media.title, media.description, media.posterPath, media.runtime, media.releaseDate, media.producers, media.genres);
        //deisplay the box if in range 
        totalboxes++;
        console.log("page", page, "resultsPerPage", resultsPerPage, "totalboxes", totalboxes);
        if(totalboxes <= resultsPerPage*(page+1) && totalboxes > resultsPerPage*page) {
            console.log("displaying box", mediaBox.dataset.id);
            mediaBox.classList.remove('undisplayed');
            displayedboxes++;
        }
        // append box
        contentBox.appendChild(mediaBox);
    });
    while(displayedboxes < resultsPerPage) {
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
    mediaBox.classList.add('media-box',"undisplayed");
    mediaBox.dataset.id = id;
    mediaBox.dataset.type = type;

    const w_add = document.createElement('div');
    const w_remove = document.createElement('div');

    w_add.classList.add('watchlist-modify', 'add');
    w_add.textContent = '+';
    w_remove.classList.add('watchlist-modify', 'remove');
    w_remove.textContent = '-';


    const el_title = document.createElement('h2');
    el_title.textContent = title;
    el_title.classList.add('media-title');
    const el_description = document.createElement('p');
    el_description.textContent = description;
    el_description.classList.add('media-description');
    const el_poster_path = document.createElement('img');
    if(type === 'podcast') {
        el_poster_path.src = posterPath;
    }
    else if(type === 'movie') {
        el_poster_path.src = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    }
    el_poster_path.classList.add('media-image');
    // el_poster_path.style.width = '250px';
    el_poster_path.alt = `${title} poster`;
    el_poster_path.classList.add('media-image');
    const el_runtime = document.createElement('p');
    el_runtime.textContent = `Runtime: ${runtime} minutes`;
    el_runtime.classList.add('media-duration');
    const el_release_date = document.createElement('p');
    el_release_date.textContent = releaseDate;
    el_release_date.classList.add('media-release-date');
    const el_producers = document.createElement('p');
    el_producers.textContent = producers;
    el_producers.classList.add('media-producers');
    const el_genres = document.createElement('p');
    el_genres.textContent = genres;
    el_genres.classList.add('media-genres');

    mediaBox.append(w_add, el_title, w_remove, el_description, el_poster_path, el_runtime, el_release_date, el_producers, el_genres);

    return mediaBox;
}

function CreateEmptyMediaBox(placeholderText = "") {
    const mediaBox = document.createElement('div');
    mediaBox.classList.add('media-box','media-box-placeholder', "placeholder");
    mediaBox.dataset.type = "placeholder";

    const text = document.createElement('span');
    text.textContent = placeholderText;

    mediaBox.append(text);

    return mediaBox;
}