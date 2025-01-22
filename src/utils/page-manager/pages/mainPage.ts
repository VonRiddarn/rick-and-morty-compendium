import { HeaderType } from "../../../enums/header.enums";
import api from "../../../services/api";
import { Character, Entity, SearchResult } from "../../../types/api.types";
import { Page } from "../../../types/pageManager.types";

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
			init();

		console.log("++ Main");
	},
	exit: function (): void {
		console.log("-- Main");
	}
}

let a = mainPage.node.appendChild(document.createElement("button"));
a.innerHTML = "MORE PEOPLE!";
a.addEventListener("click", () => {
	addMorePeople();
});

const init = async () => {
	// TODO: Use the regular search method for this later and simply call it by default if currentSearch is undefined
	currentSearch = await api.getResultsFromPage<Character>(1, "character");
	currentSearch?.results.forEach((e) => mainPage.node.appendChild(document.createElement("p")).innerHTML = e.name);
	console.log("Fetching initial search from api - you should get this message ONLY ONCE!");
} 

const addMorePeople = async () => {
	console.log(currentSearch);
	let s = currentSearch?.info.next;
	let p = s?.substring(s.length - 1);

	currentSearch = await api.getResultsFromPage<Character>(Number.parseInt(p!), "character");
	currentSearch?.results.forEach((e) => mainPage.node.appendChild(document.createElement("p")).innerHTML = e.name);
	console.log(currentSearch);
}