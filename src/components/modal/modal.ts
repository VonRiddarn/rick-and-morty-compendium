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
		currentRoot.id = "modal-root";

		currentRoot.addEventListener('click', (event) => {
			if(event.target === currentRoot) 
				killModal(currentRoot as HTMLElement);
		});

		currentModal.modalNode = currentRoot.appendChild(document.createElement("div"));
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = "<";
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = ">";
		currentModal.modalNode.appendChild(document.createElement("Button")).innerHTML = "X";
		
		currentModal.contentNode = currentModal.modalNode.appendChild(document.createElement("div"));
		
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
		currentModal.contentNode.innerHTML = ""
		currentModal.contentNode.appendChild(content);
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
	container.appendChild(document.createElement("p")).textContent = msg;

	return container;
}

const getCharacterModal = (character:Character) => {
	const container = document.createElement("div");

	container.appendChild(document.createElement("h2")).textContent = character.name;

	return container;
}