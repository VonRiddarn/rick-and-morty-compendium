import Endpoint from "../types/Endpoint";
import Query from "../types/Query";
import SearchResult from "../types/SearchResult";

const API_ROOT = "https://rickandmortyapi.com/api/";

// TODO: Make this accept a query: value pair array and append it.
// This makes us able to dynamically add the queries from the caller
/*
	bep<T>(endpoint: Endpoint, queries:Query<T>)
*/
const buildEndPoint = (endpoint: Endpoint, queries: Query[] = []): string => `${API_ROOT}${endpoint}/${constructQuery(queries)}`;

const constructQuery = (queries: Query[]): string => {
	if(queries.length <= 0)
		return "";

	const parsedQueries = queries.map(({key, value}) => `${key}=${value}`);

	return `?${parsedQueries.join("&")}`;
}

// TODO: Add some Try-catches to handle 4xx errors

const api = {
	// Generic searches (Possible because the API is structured <3)
	getObjectFromId: async <T>(id: Number, endpoint:Endpoint): Promise<T | null> => {
		const response = await fetch(`${buildEndPoint(endpoint)}/${id}`);
		return await response.json() as T | null;
	},
	getObjectFromUrl: async <T>(url: string): Promise<T | null> => {
		const response = await fetch(url);
		return await response.json() as T | null;
	},
	getObjectsFromRoot: async <T>(endpoint: Endpoint, queries: Query[] = []): Promise<T[]> => {
		const response = await fetch(`${buildEndPoint(endpoint, queries)}`);
		const data = await response.json() as T[] | null;

		return data === null ? [] : data;
	},
	getObjectsFromIds: async <T>(ids: Number[], endpoint:Endpoint): Promise<T[]> => {
		const response = await fetch(`${buildEndPoint(endpoint)}${ids.join(",")}/`);
		const data = await response.json() as T[] | null;

		return data === null ? [] : data;
	},
	getObjectsFromUrls: async <T>(urls: string[]): Promise<T[]> => {
		const response = await Promise.all(urls.map(url => api.getObjectFromUrl<T>(url)));
		return response.filter(e => e !== null) as T[];
	},
	getObjectsFromPage: async <T>(page: Number, endpoint:Endpoint, queries: Query[] = []): Promise<T[]> => {

		queries.unshift({key: "page", value: page.toString()});

		const response = await fetch(`${buildEndPoint(endpoint, queries)}`);
		const data = await response.json() as SearchResult<T> | null;

		return data === null ? [] : data.results;
	},
} as const;

export default api;