import { favoritesButton } from "../../../components/layout/header/header";
import { HeaderType } from "../../../enums/header.enums";
import { Page } from "../../../types/pageManager.types";

export const favoritesPage: Page = {
	uid: "favorites",
	header: {
		title: "Favorites",
		type: HeaderType.Sub
	},
	node: document.createElement("main"),
	enter: function (): void {
		console.log("++ Fav");
		favoritesButton.setAttribute("style", "color: red;");
		favoritesButton.classList.add("disabled");
	},
	exit: function (): void {
		console.log("-- Fav");
		favoritesButton.removeAttribute("style");
		favoritesButton.classList.remove("disabled");
	}
}