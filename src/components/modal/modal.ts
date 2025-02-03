import { Character, Entity, Episode, Location } from "../../types/api.types";
import { parseUrl } from "../../utils/api.utils";
import "./modal.scss";

type Modal = {
	modalNode: HTMLElement | null;
	contentNode: HTMLElement | null;
}

let currentRoot: HTMLElement | null = null; 
const currentModal:Modal = {
	modalNode: null,
	contentNode: null
}

const updateModal = (content?: HTMLElement) => {

	if(currentRoot === null)
	{
		currentRoot = document.createElement("div");
		currentRoot.id = "modal-root";

		currentRoot.addEventListener('click', (event) => {
			if(event.target === currentRoot) 
				killModal(currentRoot as HTMLElement);
		});

		currentModal.modalNode = currentRoot.appendChild(document.createElement("div"));
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = "<";
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = ">";
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = "X";
		
		currentModal.contentNode = currentModal.modalNode.appendChild(document.createElement("section"));
		
		currentModal.modalNode.id = "modal-container";
		currentModal.contentNode.id = "modal-content";

		document.querySelector("body")?.appendChild(currentRoot) as HTMLElement;
	}
	else
	{
		currentRoot.classList.remove("force-hidden");
	}

	if(content && currentModal.contentNode)
	{
		// We need to do this because we might add eventlisteners within the modal later.
		// Also: This approach is faster than a loop replacement.
		currentModal.contentNode.replaceWith(content);
		currentModal.contentNode = content;
		currentModal.contentNode.id = "modal-content";
	}
}

const killModal = (modalRoot:HTMLElement) => {
	modalRoot.classList.add("force-hidden");

	if(currentModal.contentNode)
		currentModal.contentNode.innerHTML = "";
}

export const openFilterModal = () => {
	updateModal(getErrorModal("FILTER"));
}

export const openEntityModal = (entity:Entity) => {
	const type = parseUrl(entity.url);
	let contentMethod = getErrorModal("ERROR: Couldn't create modal from type!");

	switch(type)
	{
		case "character":
		contentMethod = getCharacterModal(entity as Character);
		break;

		case "location":
		contentMethod = getLocationModal(entity as Location);
		break;

		case "episode":
		contentMethod = getEpisodenModal(entity as Episode);
		break;
	}

	updateModal(contentMethod);
}

const generateModalHeader = (entity: Entity) => {
	const span = document.createElement("span");
	span.id = "modal-header";
	const favoriteButton = span.appendChild(document.createElement("button"));
	const wikiButton = span.appendChild(document.createElement("button"));
	span.appendChild(document.createElement("h2")).textContent = entity.name;

	favoriteButton.textContent = "❤";

	wikiButton.textContent = "📄";
	wikiButton.addEventListener('click', () => {
		window.open(`https://rickandmorty.fandom.com/wiki/${entity.name.split(" ").join("_")}`);
	});

	return span;
}

const getErrorModal = (msg:string) => {

	const container = document.createElement("section")
	container.appendChild(document.createElement("h2")).textContent = "ERROR";
	container.appendChild(document.createElement("p")).textContent = msg;

	return container;
}

const getCharacterModal = (character:Character) => {
	const container = document.createElement("section");
	container.appendChild(generateModalHeader(character));

	return container;
}

const getLocationModal = (location:Location) => {
	const container = document.createElement("section");
	container.appendChild(generateModalHeader(location));

	return container;
}

const getEpisodenModal = (episode:Episode) => {
	const container = document.createElement("section");
	container.appendChild(generateModalHeader(episode));

	return container;
}