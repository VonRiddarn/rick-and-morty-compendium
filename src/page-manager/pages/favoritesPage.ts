import { favoritesButton } from "../../components/layout/header/header";
import { HeaderType } from "../../components/layout/header/header.enums";
import { Page } from "../../types/pageManager.types";

export const favoritesPage: Page = {
	uid: "favorites",
	header: {
		title: "Favorites",
		type: HeaderType.Sub
	},
	node: document.createElement("main"),
	enter: function (): void {
		console.log("++ Fav");
	},
	exit: function (): void {
		console.log("-- Fav");
		favoritesButton.removeAttribute("style");
		favoritesButton.classList.remove("disabled");
	}
}