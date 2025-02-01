import { Character, Location, Episode } from "../types/api.types";
import { parseSignature } from "./api.utils";

export const cardRenderer = {
	characterCard: (character:Character) => {
		const el = document.createElement("article");
		el.classList.add("card");
		el.appendChild(document.createElement("p")).innerHTML = `${character.status}`;
		el.appendChild(document.createElement("img")).src = character.image;
		el.appendChild(document.createElement("h2")).innerHTML = character.name;
		el.appendChild(document.createElement("p")).innerHTML = `📍${character.location.name}`;
		el.appendChild(document.createElement("p")).innerHTML = `🏠${character.origin.name}`;
		
		return el;
	},
	locationCard: (location:Location) => {
		const el = document.createElement("article");
		el.classList.add("card");
		//e.appendChild(document.createElement("img")).src = LOCATION TYPE IMAGES;
		el.appendChild(document.createElement("h2")).innerHTML = location.name;
		el.appendChild(document.createElement("p")).innerHTML = location.type;
		el.appendChild(document.createElement("p")).innerHTML = location.dimension;
		el.appendChild(document.createElement("p")).innerHTML = `${location.residents.length} inhabitants`;
		
		return el;
	},
	episodeCard: (episode: Episode) => {

		const {season:s, episode:e} = parseSignature(episode.episode);
		const el = document.createElement("article");
		el.classList.add("card");

		const signature = el.appendChild(document.createElement("p"));
		signature.classList.add("signature");
		signature.innerHTML = `S${s}E${e}`;

		el.appendChild(document.createElement("h2")).innerHTML = episode.name;
		el.appendChild(document.createElement("p")).innerHTML = episode.air_date;
		el.appendChild(document.createElement("p")).innerHTML = `${episode.characters.length} actors`;
		
		return el;
	}

} as const;