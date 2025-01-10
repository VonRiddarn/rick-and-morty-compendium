import api from "./services";
import Character from "./types/Character";
import Place from "./types/Place";
import SearchResult from "./types/SearchResult";

const main = document.querySelector("main") as HTMLElement;

// TODO: Merge all non-local calls to the api object instead.

// Fetch and display places and their residents from a given page
const getPlaces = async (page = 1): Promise<void> => {
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
    const data: SearchResult<Place> = await response.json();

    // Iterate through the location results and append them to the main element
    for (const e of data.results) {
        const nameElement = document.createElement("h2");
        nameElement.innerHTML = e.name;
        main.appendChild(nameElement);

        // Get characters for this location and display their images
        const characters = await api.getCharacters.fromUrls(e.residents);
		debugPlaceCharacterImages(characters);
    }
};

const debugPlaceCharacterImages = (characters: Character[]) => {

	characters.forEach((c) => {
		const imgElement = document.createElement("img");
		imgElement.src = c.image; // Set the image source
		main.appendChild(imgElement);
	});

}

export { getPlaces, debugPlaceCharacterImages };