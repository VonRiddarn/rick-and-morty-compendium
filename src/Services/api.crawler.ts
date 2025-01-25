// TODO: Export dynamic list of properties that can be used in the filter modal dropdowns.
// IT IS VERY IMPORTANT THAT WE ONLY RUN THIS AT INITIALIZATION - We do NOT want to get rate limited!

import { Episode, EpisodeReference, Season } from "../types/api.types";
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
	episodes.forEach((e) => addEpisodeToSeason(parseSignature(e, "season"), e));
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

const parseSignature = (episodeReference: EpisodeReference, extract:"season" | "episode"): number => {
	
	const match = episodeReference.signature.match(/S(\d+)E(\d+)/);
	
	if (!match) 
		return -1;

	const seasonNumber = parseInt(match[1], 10);
	const episodeNumber = parseInt(match[2], 10);

	return extract === "season" ? seasonNumber : episodeNumber;
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

// TODO: Add crawl for 
/*
Location
		Type
		Dimension
		Note: All types and dimensions can be collected in 7 calls.
*/

const types:string[] = [];
const dimensions:string[] = [];

const initializeLocations = async () => {

}