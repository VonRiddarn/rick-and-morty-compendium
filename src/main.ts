const main = document.querySelector("main") as HTMLElement;

import api from "./Services/api";

let cp = 1;
let lp = 1;

document.getElementById('characters-button')?.addEventListener('click', async () => {
	main.innerHTML = "";
	console.log(await api.getCharacters.fromPage(cp++));
});

document.getElementById('locations-button')?.addEventListener('click', async () => {
	main.innerHTML = "";
	console.log(await api.getPlaces.fromPage(lp++));
});

document.getElementById('episodes-button')?.addEventListener('click', () => {
	main.innerHTML = "";
});