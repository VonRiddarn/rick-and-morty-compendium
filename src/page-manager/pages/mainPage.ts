import { renderCard } from "../../components/entityCard/entityCard";
import { HeaderType } from "../../components/layout/header/header.enums";
import api from "../../services/api";
import { Character, Location, Entity, SearchResult, Episode, Endpoint, Query } from "../../types/api.types";
import { Page } from "../../types/pageManager.types";

let currentSearch: SearchResult<Entity> | undefined = undefined;

let prevPage: string = "";
let nextPage: string = "";

export const mainPage: Page = {
	uid: "main",
	header: {
		title: "Rick and Morty compendium",
		type: HeaderType.Main
	},
	node: document.createElement("main"),
	enter: function (): void {
		// Entered for first time, or after an error.
		if(currentSearch === undefined)
			loadEntitiesFromFilter("character");

		console.log("++ Main");
	},
	exit: function (): void {
		console.log("-- Main");
	}
}

let a = mainPage.node.appendChild(document.createElement("button"));
a.innerHTML = "MORE PEOPLE!";

const loadEntitiesFromFilter = async (endpoint: Endpoint, queries: Query[] = []) => {

	// We will use main:empty::after OR main:not(:has(*))::after
	// To apply a spinner when main has no content. 
	mainPage.node.innerHTML = "";

	currentSearch = await api.getResults.fromPage<Entity>(1, endpoint, queries);

	currentSearch?.results.forEach((e) => {
		mainPage.node.appendChild(renderCard(e) as HTMLElement);
	});

	mainPage.node.appendChild

	console.log("Fetching initial search from api - you should get this message ONLY ONCE!");
}

const loadEntitiesFromPagnation = async (url: string) => {
	
}

const addMorePeople = async () => {
	if(currentSearch === undefined)
		return;

	let nextPage = currentSearch.info.next;
	if(nextPage === null)
		return;

	currentSearch = await api.getResults.fromUrl<Entity>(nextPage);
	currentSearch?.results.forEach((e) => mainPage.node.appendChild(renderCard(e) as HTMLElement));
	console.log(currentSearch);
}