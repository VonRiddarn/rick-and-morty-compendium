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
	},
	exit: function (): void {
		console.log("-- Fav");
	}
}