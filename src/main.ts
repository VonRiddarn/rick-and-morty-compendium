// TODO: Create categories and clone cors anywhere to local
// https://dev.to/saiavinashiitr/comment/19df0
// https://github.com/Rob--W/cors-anywhere
const main = document.querySelector("main") as HTMLElement;

import api from "./services";
import { debugPlaceCharacterImages, getPlaces} from "./utilities";

let cp = 1;
let lp = 1;

document.getElementById('characters-button')?.addEventListener('click', async () => {
	main.innerHTML = "";
	debugPlaceCharacterImages(await api.getCharacters.fromPage(cp++));
});

document.getElementById('locations-button')?.addEventListener('click', () => {
	main.innerHTML = "";
	getPlaces(lp++); // Disgusting test code
});

document.getElementById('episodes-button')?.addEventListener('click', () => {
	main.innerHTML = "";
});