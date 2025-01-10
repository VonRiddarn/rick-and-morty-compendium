import Character from "../types/Character";
import Endpoint from "../types/Endpoint";
import Episode from "../types/Episode";
import Place from "../types/Place";
import SearchResult from "../types/SearchResult";

const API_ROOT = "https://rickandmortyapi.com/api/";

const api = Object.freeze({
	getCharacters: {
		fromIds: async (ids: number[]): Promise<Character[]> => {
			return await getObjectsFromIds<Character>(ids, "character");
		},
		fromUrls: async (urls: string[]): Promise<Character[]> => {
			return await getObjectsFromUrls<Character>(urls);
		},
		fromPage: async (page: number): Promise<Character[]> => {
			return await getObjectsFromPage<Character>(page, "character");
		},
		fromName: async (name: string): Promise<Character[]> => {
			const response = await fetch(`${buildEndPoint("character")}?name=${name}`);
			const data = await response.json() as SearchResult<Character> | null;

			return data === null ? [] : data.results;
		}
	},
	getCharacter: {
		fromId: async (id: number): Promise<Character | null> => {
			return await getObjectFromId<Character>(id, "character");
		},
		fromUrl: async (url: string): Promise<Character | null> => {
			return await getObjectFromUrl<Character>(url);
		}
	},
	getPlaces: {
		fromIds: async (ids: Number[]): Promise<Place[]> => {
			return getObjectsFromIds<Place>(ids, "location");
		},
		fromPage: async (page: Number): Promise<Place[]> => {
			return await getObjectsFromPage<Place>(page, "location");
		},
	}
});

const buildEndPoint = (endpoint: Endpoint): string | null => `${API_ROOT}${endpoint}/`;

// Generics (Possible because the API is structured <3)
/* ----- ID -----*/
const getObjectFromId = async <T>(id: Number, endpoint:Endpoint): Promise<T | null> => {
	const response = await fetch(`${buildEndPoint(endpoint)}/${id}`);
	return await response.json() as T | null;
}

const getObjectsFromIds = async <T>(ids: Number[], endpoint:Endpoint): Promise<T[]> => {
	const response = await fetch(`${buildEndPoint(endpoint)}${ids.join(",")}`);
	const data = await response.json() as T[] | null;

	return data === null ? [] : data;
}

/* ----- URL -----*/
const getObjectFromUrl = async <T>(url: string): Promise<T | null> => {
	const response = await fetch(url);
	return await response.json() as T | null;
}
const getObjectsFromUrls = async <T>(urls: string[]): Promise<T[]> => {
	const response = await Promise.all(urls.map(url => getObjectFromUrl<T>(url)));
	return response.filter(e => e !== null) as T[];
}

/* ----- PAGE ----- */
const getObjectsFromPage = async <T>(page: Number, endpoint:Endpoint): Promise<T[]> => {
	const response = await fetch(`${buildEndPoint(endpoint)}?page=${page}`);
	const data = await response.json() as SearchResult<T> | null;

	return data === null ? [] : data.results;
}

export default api;