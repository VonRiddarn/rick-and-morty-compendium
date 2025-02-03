import { Character, Entity } from "../../types/api.types";
import { getEndpointName, parseUrl } from "../../utils/api.utils";
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
		return;

		case "episode":
		return;

		default:
		return;
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