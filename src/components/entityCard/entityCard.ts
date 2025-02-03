import { Character, Entity, Episode, Location } from "../../types/api.types";
import { getEndpointName, parseSignature, parseUrl } from "../../utils/api.utils";
import { openEntityModal } from "../modal/modal";
import "./entityCard.scss";

export const renderCard = (entity:Entity) => {

	let card = null;

	switch(getEndpointName(entity))
	{
		case "character":
		card = generateCharacterCard(entity as Character);
		break;

		case "location":
		card = generateLocationCard(entity as Location);
		break;

		case "episode":
		card = generateEpisodeCard(entity as Episode);
		break;

		default:
		console.error("COULD NOT FIND ENDPOINT OF CARD!");
		return null;
	}
	
	card.classList.add("entity-card");
	card.classList.add("unselectable");
	card.tabIndex = 0;
	card.addEventListener('click', () => {
		openEntityModal(entity);
	});

	return card;
}

const generateCharacterCard = (character: Character) => {
	const el = document.createElement("article");
	el.appendChild(document.createElement("p")).innerHTML = `${character.status}`;
	el.appendChild(document.createElement("img")).src = character.image;
	el.appendChild(document.createElement("h2")).innerHTML = character.name;
	el.appendChild(document.createElement("p")).innerHTML = `📍${character.location.name}`;
	el.appendChild(document.createElement("p")).innerHTML = `🏠${character.origin.name}`;
	
	return el;
}

const generateLocationCard = (location:Location) => {
	const el = document.createElement("article");
	//e.appendChild(document.createElement("img")).src = LOCATION TYPE IMAGES;
	el.appendChild(document.createElement("h2")).innerHTML = location.name;
	el.appendChild(document.createElement("p")).innerHTML = location.type;
	el.appendChild(document.createElement("p")).innerHTML = location.dimension;
	el.appendChild(document.createElement("p")).innerHTML = `${location.residents.length} inhabitants`;
	
	return el;
}

const generateEpisodeCard = (episode: Episode) => {

	const {season:s, episode:e} = parseSignature(episode.episode);
	const el = document.createElement("article");

	const signature = el.appendChild(document.createElement("p"));
	signature.classList.add("signature");
	signature.innerHTML = `S${s}E${e}`;

	el.appendChild(document.createElement("h2")).innerHTML = episode.name;
	el.appendChild(document.createElement("p")).innerHTML = episode.air_date;
	el.appendChild(document.createElement("p")).innerHTML = `${episode.characters.length} actors`;
	
	return el;
}