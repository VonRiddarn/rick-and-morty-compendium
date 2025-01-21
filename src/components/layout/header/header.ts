import { PageId } from "../../../enums/pageManager.enums";
import { DEBUG, switchPage } from "../../../utils/pageManager";
import "./header.scss";

// Header navigational buttons
export const backButton = document.getElementById("header-btn-back");
export const filterButton = document.getElementById("header-btn-filter");
export const favoritesNutton = document.getElementById("header-btn-favorites");

export const initializeHeader = () => {
		// Add eventlisteners
		backButton?.addEventListener("click", () => {
			switchPage(PageId.Favorites);
		});
	
		filterButton?.addEventListener("click", () => {
			switchPage(PageId.Main);
		});
	
		favoritesNutton?.addEventListener("click", () => {
			DEBUG();
		});
}