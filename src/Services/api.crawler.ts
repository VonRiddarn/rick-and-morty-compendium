// TODO: Export dynamic list of properties that can be used in the filter modal dropdowns.
// IT IS VERY IMPORTANT THAT WE ONLY RUN THIS AT INITIALIZATION - We do NOT want to get rate limited!

import { Episode, EpisodeReference, Location, Season } from "./api.types";
import { parseSignature } from "../utils/api.utils";
import api from "./api";

export const seasons: { [key: string]: Season } = {};

export const initializeCrawledValues = async () => {
	await initializeSeasons();
	await initializeLocations();
}

// TODO: Add error catch
// Nothing here is done yet, everything is subject for change!
const initializeSeasons = async () => {
	const episodes = await generateEpisodeReferences();
	episodes.forEach((e) => addEpisodeToSeason(parseSignature(e.signature).season, e));
}

const addEpisodeToSeason = (season:number, episode:EpisodeReference) => {

	if (!seasons[season]) {
		seasons[season] = {
			name: `Season ${season}`,
			episodes: []
		};
	}

	seasons[season].episodes.push(episode);
}

const generateEpisodeReferences = async ():Promise<EpisodeReference[]> => {
	let references:EpisodeReference[] = [];

	let currentSearch = await api.getResults.fromPage<Episode>(1, "episode");

	while(currentSearch !== undefined)
	{
		references = references.concat(parseEpisodes(currentSearch.results));
		let nextSearch = currentSearch.info.next;
		
		if(nextSearch === null)
			break;
		
		currentSearch = await api.getResults.fromUrl<Episode>(nextSearch);
	}
	
	return references;
}

const parseEpisodes = (episodes:Episode[]):EpisodeReference[] => {
	return episodes.map(e => ({ name: e.name, signature: e.episode, url: e.url}));
}

// --------------------------- LOCATION TYPES  ---------------------------

// NOTE:
// When using this to search, make sure to only filter using name if the items per type are above 20.
// Anything below will just show all search results on the page. Grey out name for clarity.
export const types:{ [key: string]: number } = {};

const initializeLocations = async () => {

	let currentSearch = await api.getResults.fromPage<Location>(1, "location");

	while(currentSearch !== undefined)
	{
		currentSearch.results.forEach((e) => {
			let type = e.type;
			if (!types[type]) {
				types[type] = 0;
			}
		
			types[type]++;
		});

		let nextSearch = currentSearch.info.next;
		
		if(nextSearch === null)
			break;
		
		currentSearch = await api.getResults.fromUrl<Location>(nextSearch);
	}
}