import { ExternalService } from "./utils.mjs";

let movieService = new ExternalService("https://localhost:5001/api/movies");
let podcastService = new ExternalService("https://localhost:5001/api/podcasts");

let movieData = await movieService.getData();
let podcastData = await movieService.getData();