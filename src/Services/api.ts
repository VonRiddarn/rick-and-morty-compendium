import Character from "../types/Character";
import SearchResult from "../types/SearchResult";

const API_ROOT = "https://rickandmortyapi.com/api/";

const api = Object.freeze({
	getCharacters: {
		fromIds: async (ids: number[]): Promise<Character[]> => {
			const response = await fetch(`${getEndPoint("character")}/${ids.join(",")}`);
			const data = await response.json() as Character[] | null;

			if(data === null)
				return [];

			return data;
		},
		fromUrls: async (urls: string[]): Promise<Character[]> => {
			const results = await Promise.all(urls.map(url => api.getCharacter.fromUrl(url)));
			return results.filter(e => e !== null) as Character[];
		},
		fromPage: async (page: number): Promise<Character[]> => {
			const response = await fetch(`${getEndPoint("character")}/?page=${page}`);
			const data = await response.json() as SearchResult<Character> | null;

			if(data === null)
				return [];

			return data.results;
		},
		fromName: async (name: string): Promise<Character[]> => {
			const response = await fetch(`${getEndPoint("character")}/?name=${name}`);
			const data = await response.json() as SearchResult<Character> | null;

			if(data === null)
				return [];

			return data.results;
		}
	},
	getCharacter: {
		fromId: async (id: number): Promise<Character | null> => {

			const response = await fetch(`${getEndPoint("character")}/${id}`);
			return await response.json() as Character | null;

		},
		fromUrl: async (url: string): Promise<Character | null> => {

			const response = await fetch(url);
			return await response.json() as Character | null;

		}
	},
	getLocations: {
		// Add stuff here
	}
});

const getEndPoint = (point: "character" | "location" | "episode"): string => {
	return `${API_ROOT}${point}/`;
}

export default api;

// TODO: Find a way to build any queries that we want to attatch to the get methods.
// This will probably include us getting this from the utilities?

/* 
	Something like this?
	type CharacterQuery = {
		key: "name" | "page" | number
	}
*/

/*const buildQueryString = (params: CharacterQuery[]): string => {
    return params.map(({ key, value }) => `${key}=${value}`).join("&");
};*/