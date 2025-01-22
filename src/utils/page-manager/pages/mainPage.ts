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

const init = async () => {
	// TODO: Use the regular search method for this later and simply call it by default if currentSearch is undefined
	currentSearch = await api.getResultsFromPage<Character>(1, "character");
	currentSearch?.results.forEach((e) => mainPage.node.innerHTML += e.name + "<br/>");
	console.log("Fetching initial search from api - you should get this message ONLY ONCE!");
} 