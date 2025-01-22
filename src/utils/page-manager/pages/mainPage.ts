import { HeaderType } from "../../../enums/header.enums";
import { Page } from "../../../types/pageManager.types";

export const mainPage: Page = {
	uid: "main",
	header: {
		title: "Rick and Morty compendium",
		type: HeaderType.Main
	},
	node: document.createElement("main"),
	enter: function (): void {
		console.log("++ Main");
	},
	exit: function (): void {
		console.log("-- Main");
	}
}