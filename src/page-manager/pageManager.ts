import { header } from "../components/layout/header/header";
import { Page } from "../types/pageManager.types";

let currentPage: Page | undefined = undefined;

// Wrapper
export const pageManager = {

	getCurrentPage: () => currentPage as Page,

	switchPage: (newPage: Page | undefined) => {
		if(newPage === undefined)
		{
			console.error("Cannot process page od type 'undefined' - Please pass a valid page!");
			return;
		}
		
		if(currentPage !== undefined) {
			currentPage.exit();
		}
	
		// TODO: Kill modal!
		// modalManager.kill(); Or something

		currentPage = newPage;
		newPage.enter();
		
		// Edit header
		header.setHeader(newPage.header.title, newPage.header.type);
	
		// Replace main
		const m = document.querySelector("main") as HTMLElement;
		m.parentElement?.replaceChild(newPage.node, m);
	},

} as const;