import { Endpoint, Entity, Query, SearchResult } from "../types/api.types";

const API_ROOT = "https://rickandmortyapi.com/api/";


const buildEndpoint = (endpoint: Endpoint, queries: Query[] = [], asAdditionals = false): string => `${API_ROOT}${endpoint}/${constructQuery(queries, asAdditionals)}`;

const constructQuery = (queries: Query[], asAdditionals = false): string => {
	if(queries.length <= 0)
		return "";

	const parsedQueries = queries.map(({key, value}) => `${key}=${value}`);

	return asAdditionals ? `&${parsedQueries.join("&")}` : `?${parsedQueries.join("&")}`;
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

	getObject: {
		// Generic searches (Possible because the API is structured <3)
		fromId: async <T>(id: Number, endpoint:Endpoint): Promise<T | undefined> => {
			const response = await fetch(`${buildEndpoint(endpoint)}/${id}`);
			return await response.json() as T | undefined;
		},
		fromUrl: async <T>(url: string): Promise<T | undefined> => {
			const response = await fetch(url);
			return await response.json() as T | undefined;
		},
	},
	getObjects: {
		fromRoot: async <T>(endpoint: Endpoint, queries: Query[] = []): Promise<T[]> => {
			const response = await fetch(`${buildEndpoint(endpoint, queries)}`);
			const data = await response.json() as T[] | undefined;
	
			return data === undefined ? [] : data;
		},
		fromIds: async <T>(ids: Number[], endpoint:Endpoint, queries: Query[] = []): Promise<T[]> => {
			const response = await fetch(`${buildEndpoint(endpoint)}${ids.join(",")}/${constructQuery(queries)}`);
			const data = await response.json() as T[] | undefined;
	
			return data === undefined ? [] : data;
		},
		fromUrls: async <T>(urls: string[]): Promise<T[]> => {
			const response = await Promise.all(urls.map(url => api.getObject.fromUrl<T>(url)));
			return response.filter(e => e !== null) as T[];
		},
		fromPage: async <T>(page: Number, endpoint:Endpoint, queries: Query[] = []): Promise<T[]> => {
	
			queries.unshift({key: "page", value: page.toString()});
	
			const response = await fetch(`${buildEndpoint(endpoint, queries)}`);
			const data = await response.json() as SearchResult<T> | undefined;
	
			return data === undefined ? [] : data.results;
		},
	},
	getResults: {
		fromPage: async <Entity>(page: Number, endpoint:Endpoint, queries: Query[] = []): Promise<SearchResult<Entity> | undefined> => {
	
			queries.unshift({key: "page", value: page.toString()});
	
			const response = await fetch(`${buildEndpoint(endpoint, queries)}`);
			const data = await response.json() as SearchResult<Entity> | undefined;
	
			return data;
		},
		fromUrl: async <Entity>(url: string): Promise<SearchResult<Entity> | undefined> => {

			// The API already constructs a queried url, saving us work and time! <3
			const response = await fetch(url);
			const data = await response.json() as SearchResult<Entity> | undefined;
	
			return data;
		},
	}
} as const;

export default api;