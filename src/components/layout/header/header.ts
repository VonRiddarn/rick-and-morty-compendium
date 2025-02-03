import { HeaderType } from "./header.enums";
import { pageManager } from "../../../page-manager/pageManager";
import pageRepository from "../../../page-manager/pageRepository";
import "./header.scss";

// Header navigational buttons
export const backButton = document.getElementById("header-btn-back") as HTMLElement;
export const filterButton = document.getElementById("header-btn-filter") as HTMLElement;
export const favoritesButton = document.getElementById("header-btn-favorites") as HTMLElement;

const h1 = document.querySelector("h1") as HTMLElement;

export const initializeHeader = () => {
		// Add eventlisteners
		backButton?.addEventListener("click", () => {
			pageManager.switchPage(pageRepository.pages.main);
		});
	
		filterButton?.addEventListener("click", () => {
			
		});
	
		favoritesButton?.addEventListener("click", () => {
			pageManager.switchPage(pageRepository.pages.favorites);
		});
}

export const header = {

	setHeader: (title: string, type: HeaderType) => {
		h1.innerHTML = title;

		switch(type)
		{
			case HeaderType.Main:
			backButton.classList.add("force-hidden");
			favoritesButton.classList.remove("force-hidden");
			filterButton.classList.remove("force-hidden");
			break;

			case HeaderType.Sub:
			backButton.classList.remove("force-hidden");
			favoritesButton.classList.add("force-hidden");
			filterButton.classList.add("force-hidden");
			break;

			default:
			console.error("Bad HeaderType! Check your parameters!");
			backButton.classList.add("force-hidden");
			favoritesButton.classList.remove("force-hidden");
			filterButton.classList.remove("force-hidden");
			break;
		}
	},

} as const;