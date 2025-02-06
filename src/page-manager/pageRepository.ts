import { Page } from "../types/pageManager.types";
import { favoritesPage } from "./pages/favoritesPage";
import { mainPage } from "./pages/mainPage";

export const pages:Page[] = [
	mainPage,
	favoritesPage
] 

export const getPageByUid = (uid:string) => {
	return pages.find((page) => page.uid === uid);
}

pages.forEach((page) => page.init());