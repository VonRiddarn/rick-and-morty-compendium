import { Character, Entity, Episode, Location } from "../../services/api.types";
import { getEndpointName, getEntityImage } from "../../utils/api.utils";
import { openEntityModal } from "../modal/modal";
import "./entityCard.scss";

export const generateCard = (entity:Entity, length:"long" | "short") => {

	let card = null;
	const epn = getEndpointName(entity);

	if(epn !== "character" && epn !== "episode" && epn !== "location") {
		console.error("COULD NOT FIND ENDPOINT OF CARD!");
		return null;
	}
	
	card = length === "long" ? generateCardInternalLong(entity) : generateCardInternalShort(entity);
	
	card.classList.add(`entity-card-${length}`);
	card.classList.add("unselectable");
	card.tabIndex = 0;
	card.addEventListener('click', () => {
		openEntityModal(entity);
	});

	return card;
}

const generateCardInternalLong = (entity: Entity) => {

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

export const generateCardInternalShort = (entity:Entity) => {

	const entityType = getEndpointName(entity);

	const el = document.createElement("article");
	
	el.appendChild(getEntityImage(entity));

	const text = el.appendChild(document.createElement("span"));
	text.appendChild(document.createElement("h2")).innerHTML = entity.name;
	
	
	switch(entityType) {
		case "character":
			const c = entity as Character;
			text.appendChild(document.createElement("p")).innerHTML = `📍${c.location.name}`;
			text.appendChild(document.createElement("p")).innerHTML = `🏠${c.origin.name}`;
		break;

		case "location":
			const l = entity as Location;
			text.appendChild(document.createElement("p")).innerHTML = l.type;
			text.appendChild(document.createElement("p")).innerHTML = `${l.residents.length} inhabitants`;
		break;

		case "episode":
			const e = entity as Episode;
			text.appendChild(document.createElement("p")).innerHTML = e.air_date;
			text.appendChild(document.createElement("p")).innerHTML = `${e.characters.length} actors`;
		break;
	}
	
	return el;
}