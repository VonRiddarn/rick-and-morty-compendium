import { HeaderType } from "../../../enums/header.enums";
import { PageId } from "../../../enums/pageManager.enums";
import { DEBUG, switchPage } from "../../../utils/pageManager";
import "./header.scss";

// Header navigational buttons
export const backButton = document.getElementById("header-btn-back") as HTMLElement;
export const filterButton = document.getElementById("header-btn-filter") as HTMLElement;
export const favoritesNutton = document.getElementById("header-btn-favorites") as HTMLElement;

const h1 = document.querySelector("h1") as HTMLElement;

export const initializeHeader = () => {

		header.setHeader("Rick and Morty compendium", HeaderType.Main);

		// Add eventlisteners
		backButton?.addEventListener("click", () => {
			switchPage(PageId.Main);
			header.setHeader("Rick and Morty compendium", HeaderType.Main);
		});
	
		filterButton?.addEventListener("click", () => {
			DEBUG();
		});
	
		favoritesNutton?.addEventListener("click", () => {
			switchPage(PageId.Favorites);
			header.setHeader("Favorites", HeaderType.Sub);
		});
}

export const header = {

	setHeader: (title: string, type: HeaderType) => {
		h1.innerHTML = title;

		switch(type)
		{
			case HeaderType.Main:
			backButton.classList.add("force-hidden");
			break;

			case HeaderType.Sub:
			backButton.classList.remove("force-hidden");
			break;

			default:
			console.error("Bad HeaderType! Check your parameters!");
			backButton.classList.remove("force-hidden");
			break;
		}
	},

} as const;