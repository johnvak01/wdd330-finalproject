import { ExternalService, getSha1Hash } from "./utils.mjs";

export async function searchPodcasts(term) {
    let podcastService = new ExternalService("https://api.podcastindex.org/api/1.0");

    const podcast_key = import.meta.env.VITE_API_PODCASTINDEX_KEY;
    const podcast_secret = import.meta.env.VITE_API_PODCASTINDEX_SECRET;
    const unixEpoch = Math.floor(Date.now() / 1000);
    let hashInput = podcast_key + podcast_secret + unixEpoch;
    let hash = await getSha1Hash(hashInput);
    let podcastHeaders = {
        // accept: 'application/json', 
        "X-Auth-Date": unixEpoch.toString(),
        "X-Auth-Key": podcast_key,
        Authorization: hash.toString(),
        "User-Agent": "TripPlanner/1.0"
    }

    let podcastData = podcastService.getData(
        "GET",
        "/search/byterm",
        `?q=${term}`,
        podcastHeaders
    );
    return podcastData;
}
export async function getPodcastFeed(id, max=1, days=90) {
    let podcastService = new ExternalService("https://api.podcastindex.org/api/1.0");

    const podcast_key = import.meta.env.VITE_API_PODCASTINDEX_KEY;
    const podcast_secret = import.meta.env.VITE_API_PODCASTINDEX_SECRET;
    const unixEpoch = Math.floor(Date.now() / 1000);
    let hashInput = podcast_key + podcast_secret + unixEpoch;
    let hash = await getSha1Hash(hashInput);
    let podcastHeaders = {
        // accept: 'application/json', 
        "X-Auth-Date": unixEpoch.toString(),
        "X-Auth-Key": podcast_key,
        Authorization: hash.toString(),
        "User-Agent": "TripPlanner/1.0"
    }

    let podcastData = podcastService.getData(
        "GET",
        "/episodes/byfeedid",
        `?id=${id}?max=${max}?since=${unixEpoch-(60*60*24*days)}`,
        podcastHeaders
    );
    return podcastData;
}

export async function getPodcastDetails(id) {
    let podcastService = new ExternalService("https://api.podcastindex.org/api/1.0");

    const podcast_key = import.meta.env.VITE_API_PODCASTINDEX_KEY;
    const podcast_secret = import.meta.env.VITE_API_PODCASTINDEX_SECRET;
    const unixEpoch = Math.floor(Date.now() / 1000);
    let hashInput = podcast_key + podcast_secret + unixEpoch;
    let hash = await getSha1Hash(hashInput);
    let podcastHeaders = {
        // accept: 'application/json', 
        "X-Auth-Date": unixEpoch.toString(),
        "X-Auth-Key": podcast_key,
        Authorization: hash.toString(),
        "User-Agent": "TripPlanner/1.0"
    }

    let podcastData = podcastService.getData(
        "GET",
        "/episodes/byid",
        `?id=${id}`,
        podcastHeaders
    );
    return podcastData;
}

export async function searchMovies(term) {
    const tmdb_auth = import.meta.env.VITE_API_TMDB_RA_TOKEN;

    let movieService = new ExternalService("https://api.themoviedb.org");

    let movieData = await movieService.getData(
        "GET",
        "/3/search/movie",
        `?query=${term}`,
        {
            accept: 'application/json',
            Authorization: `Bearer ${tmdb_auth}`
        });
    // console.log(movieData)
    return movieData;
}

export async function getMovieDetails(id) {
    const tmdb_auth = import.meta.env.VITE_API_TMDB_RA_TOKEN;

    let movieService = new ExternalService("https://api.themoviedb.org");

    let movieData = await movieService.getData(
        "GET",
        `/3/movie/${id}`,
        ``,
        {
            accept: 'application/json',
            Authorization: `Bearer ${tmdb_auth}`
        });
    return movieData;
}