// Note: I hate this approach. It's static and does not scale.

import { PageId } from "../enums/pageManager.enums";

let currentPage: PageId = PageId.Undefined;

const pageMap = new Map<PageId, HTMLElement>();
initializePageMap();

export const initializePageManager = () => {
	if(currentPage !== PageId.Undefined)
	{
		console.error("Page manager is already initialized!");
		return;
	}

	if(replaceDomMain(pageMap.get(PageId.Main)))
		currentPage = PageId.Main;
};

export const switchPage = (newPage: PageId) => {
	if(replaceDomMain(pageMap.get(newPage)))
		currentPage = newPage;
};

export const DEBUG = () => {
	pageMap.get(PageId.Main)!.innerHTML += "O_";
}

function replaceDomMain(newMain: HTMLElement | undefined): boolean {
	if(newMain === undefined)
	{
		console.error("Passed element is undefined! Check your map key!");
		return false;
	}

	const main = document.querySelector("main") as HTMLElement;
	main.parentElement?.replaceChild(newMain, main);
	return true;
}

function initializePageMap() {
	pageMap.set(PageId.Main, document.createElement("main"));
	pageMap.set(PageId.Favorites, document.createElement("main"));

	for (const [key, value] of pageMap.entries()) {
	value.id = `page-${key}`;
	}
}