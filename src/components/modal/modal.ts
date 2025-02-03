import { Entity } from "../../types/api.types";
import { parseUrl } from "../../utils/api.utils";
import "./modal.scss";


const createModal = (content?: HTMLElement) => {
	const root = document.createElement("div");
	root.classList.add("modal");

	const modal = root.appendChild(document.createElement("div"));
	
	root.addEventListener('click', (event) => {if(event.target === root) closeModal(root)});
	
	// Cool way of making a one liner - use the closeModal method as an AND conditional to make it run
	const escClose = (event: KeyboardEvent) => event.key === "Escape" && closeModal(root);

	const closeModal = (modalRoot:HTMLElement) => {
		modalRoot.remove();
		document.removeEventListener('keydown', escClose);
	}

	if(content)
		modal.appendChild(content);

	return root;
}


export const createCardModal = (entity:Entity) => {
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

	return createModal(contentMethod);
}

const getErrorModal = (msg:string) => {
	const p = document.createElement("p");
	p.innerHTML = msg;

	return p;
}