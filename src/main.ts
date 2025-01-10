const main = document.querySelector("main") as HTMLElement;

import api from "./Services/api";
import Character from "./types/Character";
import Place from "./types/Place";

let cp = 1;
let lp = 1;
let ep = 1;

document.getElementById('characters-button')?.addEventListener('click', async () => {
	main.innerHTML = "";
	console.log(await api.getObjectsFromPage<Character>(cp++, "character", [{key: "name", value: "rick"}]));
});

document.getElementById('locations-button')?.addEventListener('click', async () => {
	main.innerHTML = "";
	console.log(await api.getObjectsFromPage<Place>(lp++, "location"));
});

document.getElementById('episodes-button')?.addEventListener('click', async () => {
	main.innerHTML = "";
	console.log(await api.getObjectsFromPage(ep++, "episode"));
});