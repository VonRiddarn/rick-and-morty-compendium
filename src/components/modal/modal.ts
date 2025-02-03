import { Entity } from "../../types/api.types";
import { parseUrl } from "../../utils/api.utils";
import "./modal.scss";

let currentModal: HTMLElement | null = null; 

const updateModal = (content?: HTMLElement) => {
	const root = document.createElement("div");
	root.classList.add("modal");

	const modal = root.appendChild(document.createElement("div"));
	
	root.addEventListener('click', (event) => {
		if(event.target === root) 
			killModal(root)
	});

	const killModal = (modalRoot:HTMLElement) => {
		currentModal = null;
		modalRoot.remove();
	}

	if(content)
		modal.appendChild(content);

	if(currentModal !== null)
		currentModal = root;
	else
		currentModal = document.querySelector("body")?.appendChild(root) as HTMLElement;
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
		contentMethod = getErrorModal(entity.name);
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
	const p = document.createElement("p");
	p.innerHTML = msg;

	return p;
}