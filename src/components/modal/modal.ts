import { Character, Entity } from "../../types/api.types";
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
		currentRoot.classList.add("modal");

		currentRoot.addEventListener('click', (event) => {
			if(event.target === currentRoot) 
				killModal(currentRoot as HTMLElement);
		});

		currentModal.modalNode = currentRoot.appendChild(document.createElement("div"));
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = "<";
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = ">";
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = "X";
		
		currentModal.contentNode = currentModal.modalNode.appendChild(document.createElement("div"));

		document.querySelector("body")?.appendChild(currentRoot) as HTMLElement;
	}
	else
	{
		currentRoot.classList.remove("force-hidden");
	}

	if(content)
	{
		currentModal.contentNode?.replaceWith(content);
		currentModal.contentNode = content;
	}
}

const killModal = (modalRoot:HTMLElement) => {
	modalRoot.classList.add("force-hidden");

	// Clear content when closing modal
	currentModal.contentNode!.innerHTML = "";
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
		contentMethod = getErrorModal(entity.name);
		break;

		case "episode":
		contentMethod = getErrorModal(entity.name);
		break;
	}

	updateModal(contentMethod);
}

const getErrorModal = (msg:string) => {

	const container = document.createElement("div")
	container.appendChild(document.createElement("p")).innerHTML = msg;

	return container;
}

const getCharacterModal = (character:Character) => {
	const container = document.createElement("div");

	container.appendChild(document.createElement("h2")).innerHTML = character.name;

	return container;
}