import { Character, Entity, Episode, Location } from "../../services/api.types";
import { getEndpointName, getEntityImage } from "../../utils/api.utils";
import { openEntityModal } from "../modal/modal";
import "./entityCard.scss";

export const generateCard = (entity:Entity) => {

	let card = null;
	const epn = getEndpointName(entity);

	if(epn !== "character" && epn !== "episode" && epn !== "location") {
		console.error("COULD NOT FIND ENDPOINT OF CARD!");
		return null;
	}
	
	card = generateCardInternal(entity);
	
	card.classList.add("entity-card");
	card.classList.add("unselectable");
	card.tabIndex = 0;
	card.addEventListener('click', () => {
		openEntityModal(entity);
	});

	return card;
}

export const generateShortCard = (entity:Entity) => {
	//TODO: Implement this
	return entity;
}

const generateCardInternal = (entity: Entity) => {

	const el = document.createElement("article");
	const entityType = getEndpointName(entity);

	if(entityType == "character")
		el.appendChild(document.createElement("p")).innerHTML = `${(entity as Character).status}`;

	el.appendChild(getEntityImage(entity));
	el.appendChild(document.createElement("h2")).innerHTML = entity.name;

	switch(entityType) {
		case "character":
			const c = entity as Character;
			el.appendChild(document.createElement("p")).innerHTML = `📍${c.location.name}`;
			el.appendChild(document.createElement("p")).innerHTML = `🏠${c.origin.name}`;
		break;

		case "location":
			const l = entity as Location;
			el.appendChild(document.createElement("p")).innerHTML = l.type;
			el.appendChild(document.createElement("p")).innerHTML = l.dimension;
			el.appendChild(document.createElement("p")).innerHTML = `${l.residents.length} inhabitants`;
		break;

		case "episode":
			const e = entity as Episode;
			el.appendChild(document.createElement("p")).innerHTML = e.air_date;
			el.appendChild(document.createElement("p")).innerHTML = `${e.characters.length} actors`;
		break;
	}
	
	return el;
}