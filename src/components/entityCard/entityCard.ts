import { Character, Entity, Episode, Location } from "../../types/api.types";
import { getEndpointName, parseSignature } from "../../utils/api.utils";
import { openEntityModal } from "../modal/modal";
import "./entityCard.scss";

export const generateCard = (entity:Entity) => {

	let card = null;

	switch(getEndpointName(entity))
	{
		case "character":
		card = generateCardInternal(entity);
		break;

		case "location":
		card = generateCardInternal(entity);
		break;

		case "episode":
		card = generateCardInternal(entity);
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

export const generateShortCard = (entity:Entity) => {
	
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

const getEntityImage = (entity:Entity):HTMLElement => {

	switch(getEndpointName(entity))
	{

		case "character":
		const cImg = document.createElement("img");
		cImg.src = (entity as Character).image;
		return cImg;

		case "location":
		const lImg = document.createElement("img");
		lImg.src = "/public/images/Icon_Location.png";
		return lImg;

		case "episode":
		const eSvg = document.createElement("div");
		fetch("/public/images/Icon_Episode_Dynamic.svg")
		.then(response => response.text())
		.then(svgContent => {
            eSvg.innerHTML = svgContent;

            const { season, episode } = parseSignature((entity as Episode).episode);

            setTimeout(() => {
                const seasonText = eSvg.querySelector("#seasonText");
                const episodeText = eSvg.querySelector("#episodeText");

                if (seasonText) seasonText.textContent = `Season ${season}`;
                if (episodeText) episodeText.textContent = `Episode ${episode}`;
            }, 0);
        })
		.catch(error => {
			console.error("Error loading svg:",error);
			eSvg.innerHTML = "Error";
		})
		return eSvg;

		default:
		console.error("COULD NOT FIND ENDPOINT OF CARD!");
		const errorImg = document.createElement("img");
		errorImg.src = "/public/images/Icon_Error.png";
		return errorImg;
	}
} 