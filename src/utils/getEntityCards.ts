import { generateCard } from "../components/entityCard/entityCard";
import api from "../services/api";
import { Endpoint, Entity, Query, SearchResult } from "../services/api.types";
import { constructQuery } from "./api.utils";

let currentSearch: SearchResult<Entity> | undefined = undefined;

export const getEntityCardsFromSearch = async (endpoint: Endpoint, queries: Query[] = []) => {

	const searchResult = await api.getResults.fromEndPoint<Entity>(endpoint, queries);
	
	if(!searchResult)
	{
		console.warn(`No results yielded from: ${endpoint}/${constructQuery(queries)}`);
		return [];
	}

	currentSearch = searchResult;
	return searchResult.results.map((e) => generateCard(e) as HTMLElement);
}

export const getEntityCardsFromUrl = async (url: string) => {

	const searchResult = await api.getResults.fromUrl<Entity>(url);
	
	if(!searchResult)
	{
		console.warn(`No results yielded from: ${url}`);
		return [];
	}

	currentSearch = searchResult;
	return searchResult.results.map((e) => generateCard(e)) as HTMLElement[];
}

export const getEntityCardsFromPagnation = async (direction: "next" | "previous") => {

	if(!currentSearch)
	{
		console.warn("Cannot use pagnatin! No search is initialized!");
		return [];
	}

	const desiredUrl = direction === "next" ? currentSearch.info.next : currentSearch.info.prev;

	if(!desiredUrl)
	{
		console.warn("Cannot use pagnation in this direction - no url exists.");
		return [];
	}

	return getEntityCardsFromUrl(desiredUrl);
}