import { HeaderType } from "../../../components/layout/header/header.enums";
import { createModal, modalContent } from "../../../components/modal/modal";
import api from "../../../services/api";
import { Character, Location, Entity, SearchResult, Episode } from "../../../types/api.types";
import { Page } from "../../../types/pageManager.types";
import { cardRenderer } from "../../renderer";

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
	currentSearch = await api.getResults.fromPage<Location>(1, "character");
	currentSearch?.results.forEach((e) => {
		const cc = mainPage.node.appendChild(cardRenderer.characterCard(e as Character));
		cc.addEventListener('click', () => {
			document.querySelector("body")?.appendChild(createModal(modalContent(e)));
		});
	});
	console.log("Fetching initial search from api - you should get this message ONLY ONCE!");
} 

const addMorePeople = async () => {
	if(currentSearch === undefined)
		return;

	let nextPage = currentSearch.info.next;
	if(nextPage === null)
		return;

	currentSearch = await api.getResults.fromUrl<Character>(nextPage);
	currentSearch?.results.forEach((e) => mainPage.node.appendChild(cardRenderer.characterCard(e as Character)));
	console.log(currentSearch);
}