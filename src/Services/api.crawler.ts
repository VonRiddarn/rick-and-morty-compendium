// TODO: Export dynamic list of properties that can be used in the filter modal dropdowns.
// IT IS VERY IMPORTANT THAT WE ONLY RUN THIS AT INITIALIZATION - We do NOT want to get rate limited!

import { Episode, EpisodeReference, Season } from "../types/api.types";
import api from "./api";

// Endpoints to crawl: 
/*

	Location
		Type
		Dimension
		Note: All types and dimensions can be collected in 7 calls.

	Episode
		Episode (S01E01)
		Notes: 
			Do not forget to parse all ansers.
			They can be typed like so:
			Season {
				name: "Season 1",
				episodes: [{
						name: "Pilot",
						url: "the.url-goes.here"
					}
				]
			} 

			This means that if both season and episode is selected in the filter, we can use the URL to just fetch that specific episode.
*/

export const seasons = undefined; //await getAllSeasons();


// TODO: Add error catch
// Nothing here is done yet, everything is subject for change!
export const getAllSeasons = async ():Promise<Season[] | undefined> => {
	const episodes = await generateEpisodeReferences();
	// generateSeasons(episodes);
	console.log(episodes);
	return undefined;
}

const generateEpisodeReferences = async ():Promise<EpisodeReference[]> => {
	let references:EpisodeReference[] = [];

	let currentSearch = await api.getResults.fromPage<Episode>(1, "episode");

	while(currentSearch !== undefined)
	{
		references = references.concat(parseEpisodes(currentSearch.results));
		let nextSearch = currentSearch.info.next;
		console.log(nextSearch);
		if(nextSearch === null)
			break;
		
		currentSearch = await api.getResults.fromUrl<Episode>(nextSearch);
	}
	
	return references;
}

const parseEpisodes = (episodes:Episode[]):EpisodeReference[] => {
	return episodes.map(e => ({ name: e.name, signature: e.episode, url: e.url}));
}