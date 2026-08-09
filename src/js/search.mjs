
import { searchPodcasts, searchMovies, getMovieDetails, getPodcastFeed, getPodcastDetails } from "./api.mjs";

console.log(searchPodcasts("dog"))
console.log(searchMovies("dog"))
console.log(getMovieDetails(200))
console.log(getPodcastDetails(2000))

export async function getAPISearchResults(query) {
    console.log("searching for", query);
    let results = [];
    // movies
    let movieResults = await searchMovies(query);
    // console.log("movies", movieResults.results);
    for (let movie of movieResults.results) {
        let movieDetails = await getMovieDetails(movie.id);
        let newMovie = {
            id: movie.id,
            type: "movie",
            title: movie.title,
            posterPath: movie.poster_path,
            runtime: movieDetails.runtime, //in minutes
            releaseDate: movie.release_date,
            description: movie.overview,
            producers: movieDetails.production_companies.map(company => company.name).join(", "),
            genres: movieDetails.genres.map(genre => genre.name).join(", ")
        };
        results.push(newMovie);
        // console.log(newMovie);
    }
    // podcasts
    let podcastResults = await searchPodcasts(query);
    // console.log("podcasts", podcastResults.feeds);
    for(let podcast of podcastResults.feeds) {
        let podcastFeed = await getPodcastFeed(podcast.id);
        if (!podcastFeed || !podcastFeed.items || podcastFeed.items.length === 0) {
            console.warn(`No feed items found for podcast with ID ${podcast.id}`);
            continue; // Skip to the next podcast if no feed items are found
        }
        // console.log("podcast feed", podcastFeed);
        // let podcastDetails = await getPodcastDetails(podcastfeed.items[0].id);
        let date = new Date((podcastFeed.items[0].datePublished) * 1000); 
        let newPodcast = {
            id: podcastFeed.items[0].id,
            type: "podcast", 
            title: podcast.title,
            posterPath: podcast.image,
            runtime: Math.ceil(podcastFeed.items[0].duration/60), //converted from seconds to minutes
            description: podcastFeed.items[0].description,
            releaseDate: date.toISOString().split('T')[0], // format as YYYY-MM-DD
            producers: podcast.author,
            genres: Object.values(podcast.categories || "none").join(", ")
        };
        results.push(newPodcast);
        // console.log(newPodcast);
    }
    return results;
}
