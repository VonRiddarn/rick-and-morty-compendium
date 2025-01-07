import Character from "./types/Character";
import SearchResult from "./types/SearchResult";

const getCharacters = async (page = 1) => {
	const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
	const data:SearchResult<Character> = await response.json();

	data.results.forEach((e) => {
		(document.querySelector("main") as HTMLElement).appendChild(document.createElement("h2")).innerHTML = e.name;
		(document.querySelector("main") as HTMLElement).appendChild(document.createElement("h3")).innerHTML = e.status;
		(document.querySelector("main") as HTMLElement).appendChild(document.createElement("h4")).innerHTML = e.location.name;
		(document.querySelector("main") as HTMLElement).appendChild(document.createElement("img")).src = e.image;
	});
};

export default getCharacters;