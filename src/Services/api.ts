import Character from "../types/Character";
import Endpoint from "../types/Endpoint";
import SearchResult from "../types/SearchResult";

const API_ROOT = "https://rickandmortyapi.com/api/";

const buildEndPoint = (endpoint: Endpoint): string | null => `${API_ROOT}${endpoint}/`;

const api = {
	// Generic searches (Possible because the API is structured <3)
	getObjectFromId: async <T>(id: Number, endpoint:Endpoint): Promise<T | null> => {
		const response = await fetch(`${buildEndPoint(endpoint)}/${id}`);
		return await response.json() as T | null;
	},
	getObjectsFromIds: async <T>(ids: Number[], endpoint:Endpoint): Promise<T[]> => {
		const response = await fetch(`${buildEndPoint(endpoint)}${ids.join(",")}`);
		const data = await response.json() as T[] | null;

		return data === null ? [] : data;
	},
	getObjectFromUrl: async <T>(url: string): Promise<T | null> => {
		const response = await fetch(url);
		return await response.json() as T | null;
	},
	getObjectsFromUrls: async <T>(urls: string[]): Promise<T[]> => {
		const response = await Promise.all(urls.map(url => api.getObjectFromUrl<T>(url)));
		return response.filter(e => e !== null) as T[];
	},
	getObjectsFromPage: async <T>(page: Number, endpoint:Endpoint): Promise<T[]> => {
		const response = await fetch(`${buildEndPoint(endpoint)}?page=${page}`);
		const data = await response.json() as SearchResult<T> | null;

		return data === null ? [] : data.results;
	},
	// Type specific searches
	getCharacters: {
		fromName: async (name: string): Promise<Character[]> => {
			const response = await fetch(`${buildEndPoint("character")}?name=${name}`);
			const data = await response.json() as SearchResult<Character> | null;

			return data === null ? [] : data.results;
		}
	},
} as const;

export default api;