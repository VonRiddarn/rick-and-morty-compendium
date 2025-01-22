import { Endpoint, Query, SearchResult } from "../types/api.types";

const API_ROOT = "https://rickandmortyapi.com/api/";


const buildEndpoint = (endpoint: Endpoint, queries: Query[] = []): string => `${API_ROOT}${endpoint}/${constructQuery(queries)}`;

const constructQuery = (queries: Query[]): string => {
	if(queries.length <= 0)
		return "";

	const parsedQueries = queries.map(({key, value}) => `${key}=${value}`);

	return `?${parsedQueries.join("&")}`;
}

// TODO: Add some Try-catches to handle 4xx errors

// TODO: Refactor and rethink how we handle results.
// We would like the ability to return a SearchResult so that we may use pagnation controls later.
// However, the "nex" and "prev" properties are string URLs to pages returning SearchResult<T> - not <T[]>.

const api = {

	extractEndpoint: <T extends { url: string }>(entity: T): string => {
		// Example: https://rickandmortyapi.com/api/episode/23
		// ["https:", "", "rickandmortyapi.com", "api", "episode", "23"]
		const parts = entity.url.split('/');
		return parts[parts.length - 2] || "";
	},

	// Generic searches (Possible because the API is structured <3)
	getObjectFromId: async <T>(id: Number, endpoint:Endpoint): Promise<T | null> => {
		const response = await fetch(`${buildEndpoint(endpoint)}/${id}`);
		return await response.json() as T | null;
	},
	getObjectFromUrl: async <T>(url: string): Promise<T | null> => {
		const response = await fetch(url);
		return await response.json() as T | null;
	},
	getObjectsFromRoot: async <T>(endpoint: Endpoint, queries: Query[] = []): Promise<T[]> => {
		const response = await fetch(`${buildEndpoint(endpoint, queries)}`);
		const data = await response.json() as T[] | null;

		return data === null ? [] : data;
	},
	getObjectsFromIds: async <T>(ids: Number[], endpoint:Endpoint): Promise<T[]> => {
		const response = await fetch(`${buildEndpoint(endpoint)}${ids.join(",")}/`);
		const data = await response.json() as T[] | null;

		return data === null ? [] : data;
	},
	getObjectsFromUrls: async <T>(urls: string[]): Promise<T[]> => {
		const response = await Promise.all(urls.map(url => api.getObjectFromUrl<T>(url)));
		return response.filter(e => e !== null) as T[];
	},
	getObjectsFromPage: async <T>(page: Number, endpoint:Endpoint, queries: Query[] = []): Promise<T[]> => {

		queries.unshift({key: "page", value: page.toString()});

		const response = await fetch(`${buildEndpoint(endpoint, queries)}`);
		const data = await response.json() as SearchResult<T> | null;

		return data === null ? [] : data.results;
	},
	getResultsFromPage: async <Entity>(page: Number, endpoint:Endpoint, queries: Query[] = []): Promise<SearchResult<Entity> | undefined> => {

		queries.unshift({key: "page", value: page.toString()});

		const response = await fetch(`${buildEndpoint(endpoint, queries)}`);
		const data = await response.json() as SearchResult<Entity> | null;

		return data === null ? undefined : data;
	},
} as const;

export default api;