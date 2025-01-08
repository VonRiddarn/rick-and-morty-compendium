import Character from "./types/Character";
import Place from "./types/Place";
import SearchResult from "./types/SearchResult";

const main = document.querySelector("main") as HTMLElement;

// Fetch a character by URL
const getCharacterByUrl = async (url: string): Promise<Character> => {
    const response = await fetch(url);
    const data: Character = await response.json();
    return data;
};

// Fetch multiple characters by URLs asynchronously
const getCharactersByUrls = async (urls: string[]): Promise<Character[]> => {
    // Use Promise.all to fetch all characters concurrently
    const chars = await Promise.all(urls.map(url => getCharacterByUrl(url)));
    return chars;
};

// Fetch and display characters from a given page
const getCharacters = async (page = 1): Promise<void> => {
    const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
    const data: SearchResult<Character> = await response.json();

    // Iterate through the character results and append them to the main element
    data.results.forEach((e) => {
        const nameElement = document.createElement("h2");
        nameElement.innerHTML = e.name;
        main.appendChild(nameElement);

        const statusElement = document.createElement("h3");
        statusElement.innerHTML = e.status;
        main.appendChild(statusElement);

        const locationElement = document.createElement("h4");
        locationElement.innerHTML = e.location.name;
        main.appendChild(locationElement);

        const imageElement = document.createElement("img");
        imageElement.src = e.image;
        main.appendChild(imageElement);
    });
};

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
        const characters = await getCharactersByUrls(e.residents);
        characters.forEach((c) => {
            const imgElement = document.createElement("img");
            imgElement.src = c.image; // Set the image source
            main.appendChild(imgElement);
        });
    }
};

export { getCharacters, getPlaces };