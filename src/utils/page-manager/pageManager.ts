import { header } from "../../components/layout/header/header";
import { Page } from "../../types/pageManager.types";

let currentPage: Page | undefined = undefined;

// Wrapper
export const pageManager = {
	switchPage: (newPage: Page) => {

		if(currentPage !== undefined) {
			currentPage.exit();
		}
	
		currentPage = newPage;
		newPage.enter();
		
		// Edit header
		header.setHeader(newPage.header.title, newPage.header.type);
	
		// Replace main
		const m = document.querySelector("main") as HTMLElement;
		m.parentElement?.replaceChild(newPage.node, m);
	},

} as const;