import { generateCard } from "../../components/entityCard/entityCard";
import { HeaderType } from "../../components/layout/header/header.enums";
import api from "../../services/api";
import { Entity, SearchResult, Endpoint, Query } from "../../types/api.types";
import { Page } from "../../types/pageManager.types";

let currentSearch: SearchResult<Entity> | undefined = undefined;

export const mainPage: Page = {
	uid: "main",
	header: {
		title: "Rick and Morty compendium",
		type: HeaderType.Main
	},
	node: document.createElement("main"),

	init: function (): void {

	},
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

	appendPagnation(mainPage.node);

	currentSearch.results.forEach((e) => {
		mainPage.node.appendChild(generateCard(e) as HTMLElement);
	});

	appendPagnation(mainPage.node);

	console.log("Fetching initial search from api - you should get this message ONLY ONCE!");
}

const appendPagnation = (parent: HTMLElement) => {
	const pagnation = parent.appendChild(document.createElement("span"));
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