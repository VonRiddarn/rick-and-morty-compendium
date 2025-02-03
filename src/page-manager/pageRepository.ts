import { favoritesPage } from "./pages/favoritesPage";
import { mainPage } from "./pages/mainPage";

const pageRepository = {

	pages: {
		main: mainPage,
		favorites: favoritesPage,
	},

} as const;

export default pageRepository;