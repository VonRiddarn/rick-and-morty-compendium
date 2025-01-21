import { Page } from "../enums/pageManager.enums";

const main = document.querySelector("main") as HTMLElement;
const header = document.querySelector("header") as HTMLElement;

const mainNodes = {
	main: document.createElement("main"),
	favorites: document.createElement("main")
}

let currentPage = Page.Main;

export const pageManager = {



} as const;