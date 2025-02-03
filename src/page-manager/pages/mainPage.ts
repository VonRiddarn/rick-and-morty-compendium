import { renderCard } from "../../components/entityCard/entityCard";
import { HeaderType } from "../../components/layout/header/header.enums";
import api from "../../services/api";
import { Character, Location, Entity, SearchResult, Episode, Endpoint, Query } from "../../types/api.types";
import { Page } from "../../types/pageManager.types";

let currentSearch: SearchResult<Entity> | undefined = undefined;

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


const loadEntities = async () => {

	if(!currentSearch)
		return;

	currentSearch.results.forEach((e) => {
		mainPage.node.appendChild(renderCard(e) as HTMLElement);
	});

	const pagnation = mainPage.node.appendChild(document.createElement("span"));
	pagnation.id = "pagnation";
	const prevButton = pagnation.appendChild(document.createElement("button"));
	const nextButton = pagnation.appendChild(document.createElement("button"));

	prevButton.textContent = "<";
	nextButton.textContent = ">";

	nextButton.addEventListener('click', () => {
		// Typescrips is wucky and needs this conditional
		if(!currentSearch)
			return;

		loadEntitiesFromPagnation(currentSearch.info.next);
	});

	prevButton.addEventListener('click', () => {
		// Typescrips is wucky and needs this conditional
		if(!currentSearch)
			return;

		loadEntitiesFromPagnation(currentSearch.info.prev);
	});

	console.log("Fetching initial search from api - you should get this message ONLY ONCE!");
}


// We will use main:empty::after OR main:not(:has(*))::after
// To apply a spinner when main has no content. 
const loadEntitiesFromFilter = async (endpoint: Endpoint, queries: Query[] = []) => {
	mainPage.node.innerHTML = "";
	currentSearch = await api.getResults.fromPage<Entity>(1, endpoint, queries);
	loadEntities();
}

const loadEntitiesFromPagnation = async (url: string | null) => {
	if(url == null)
		return;
	mainPage.node.innerHTML = "";
	currentSearch = await api.getResults.fromUrl<Entity>(url);
	loadEntities();
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