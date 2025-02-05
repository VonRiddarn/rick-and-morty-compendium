import api from "../../services/api";
import { Character, Entity, Episode, Location } from "../../types/api.types";
import { getEpisodeNameFromUrl, parseSignature, parseUrl } from "../../utils/api.utils";
import { generateCard } from "../entityCard/entityCard";
import "./modal.scss";


let backButton: HTMLElement | null = null;
let forwardButton: HTMLElement | null = null;
let modalHistory:string[] = [];
let modalIndex = 0;

type Modal = {
	modalNode: HTMLElement | null;
	contentNode: HTMLElement | null;
}

let currentRoot: HTMLElement | null = null; 
const currentModal:Modal = {
	modalNode: null,
	contentNode: null
}

const updateModal = (content?: HTMLElement, usePagnation = true) => {

	if(currentRoot === null)
	{
		currentRoot = document.createElement("div");
		currentRoot.id = "modal-root";

		currentRoot.addEventListener('click', (event) => {
			if(event.target === currentRoot) 
				killModal(currentRoot as HTMLElement);
		});

		currentModal.modalNode = currentRoot.appendChild(document.createElement("div"));

		const navigation = currentModal.modalNode.appendChild(document.createElement("nav"));

		backButton = navigation.appendChild(document.createElement("Button"));
		backButton.textContent = "<";

		backButton.addEventListener('click', async () => {
			if(modalHistory[modalIndex - 1] === undefined)
				return;

			const entity = await api.getObject.fromUrl<Entity>(modalHistory[modalIndex -1]);

			if(!entity)
				return;

			openEntityModal(entity, true);
			modalIndex--;
			console.log("BACK: " + modalHistory);
			console.log("BACK: " + modalIndex);
		});

		forwardButton = navigation.appendChild(document.createElement("Button"));
		forwardButton.textContent = ">";
		forwardButton.addEventListener('click', async () => {
			if(modalHistory[modalIndex + 1] === undefined)
				return;

			const entity = await api.getObject.fromUrl<Entity>(modalHistory[modalIndex + 1]);

			if(!entity)
				return;

			openEntityModal(entity, true);
			modalIndex++;
			console.log("BACK: " + modalHistory);
			console.log("BACK: " + modalIndex);
		});

		const closeButton = navigation.appendChild(document.createElement("Button"));
		closeButton.textContent = "X";
		closeButton.addEventListener('click', () => {
			if(currentRoot)
				killModal(currentRoot);
		});
		
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

	if(!usePagnation) {
		(backButton as HTMLElement).classList.add("force-hidden");
		(forwardButton as HTMLElement).classList.add("force-hidden");
	}
	else {
		(backButton as HTMLElement).classList.remove("force-hidden");
		(forwardButton as HTMLElement).classList.remove("force-hidden");
	}

}

const killModal = (modalRoot:HTMLElement) => {
	modalRoot.classList.add("force-hidden");

	if(currentModal.contentNode)
		currentModal.contentNode.innerHTML = "";

	modalHistory = [];
}

const updateModalHistory = (newPage: string) => {
	// Prevent duplicate history entries
	if (modalHistory[modalHistory.length - 1] === newPage) {
		console.log(`Skipping duplicate history entry for ${newPage}`);
		return;
	}

	// If we are not at the end of the history, we are branching.
	// Cut all history saved beyond the current index and start fresh.
	if (modalIndex < modalHistory.length - 1) {
		modalHistory = modalHistory.slice(0, modalIndex + 1);
	}

	modalHistory.push(newPage);
	modalIndex = modalHistory.length - 1;

	console.log("UpdateModal: " + modalHistory);
	console.log("UpdateModal: " + modalIndex);
};

export const openFilterModal = () => {
	updateModal(getErrorModal("FILTER"), false);
}

export const openEntityModal = (entity:Entity | undefined, ignoreModalHistory = false) => {

	if(entity === undefined)
	{
		console.log("NOT A VALID ENTITY!");
		return;
	}

	if(!ignoreModalHistory)
		updateModalHistory(entity.url);

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

type ModalHeaderOptions = {
	title: string;
	prefix?: string;
	suffix?: string;
}

const generateModalHeader = (headerOptions:ModalHeaderOptions) => {

	// Lazy af.
	// If defined, keep; else define as empty
	headerOptions.prefix = headerOptions.prefix ? headerOptions.prefix : "";
	headerOptions.suffix = headerOptions.suffix ? headerOptions.suffix : "";

	const span = document.createElement("span");
	span.id = "modal-header";
	const favoriteButton = span.appendChild(document.createElement("button"));
	const wikiButton = span.appendChild(document.createElement("button"));
	span.appendChild(document.createElement("h2")).textContent = `${headerOptions.prefix} ${headerOptions.title} ${headerOptions.suffix}`;

	favoriteButton.textContent = "❤";

	wikiButton.textContent = "📄";
	wikiButton.addEventListener('click', () => {
		// BRO... .replace(string, string) replaces only the FIRST INSTANCE!!!
		// To replace all instances you need to use a regex. Fml. OLD: (/,/g, "")
		window.open(`https://rickandmorty.fandom.com/wiki/${headerOptions.title.split(" ").join("_").replace(/[(),]/g, "")}`);
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
	container.appendChild(generateModalHeader({title: character.name, suffix: `(${character.status})`}));
	container.appendChild(document.createElement("img")).src = character.image;
	container.appendChild(document.createElement("p")).textContent = character.species;
	container.appendChild(document.createElement("p")).textContent = character.gender;
	container.appendChild(document.createElement("p")).textContent = character.type;
	const locationButton = container.appendChild(document.createElement("button"));
	const homeButton = container.appendChild(document.createElement("button"));

	locationButton.textContent = `📍 ${character.location.name}`;
	locationButton.classList.add("ref-button");
	locationButton.addEventListener('click', async () => {
		if(character.location.url)
			openEntityModal(await api.getObject.fromUrl<Location>(character.location.url));
	});
	
	homeButton.textContent = `🏠 ${character.origin.name}`;
	homeButton.classList.add("ref-button");
	homeButton.addEventListener('click', async () => {
		if(character.origin.url)
			openEntityModal(await api.getObject.fromUrl<Location>(character.origin.url));
	});

	container.appendChild(document.createElement("h3")).textContent = "Appearances";
	const appearances = container.appendChild(document.createElement("ul"));

	character.episode.forEach(async (e) => {
		const episodeButton = appearances.appendChild(document.createElement("li")).appendChild(document.createElement("button"));
		episodeButton.classList.add("ref-button");
		episodeButton.textContent = await getEpisodeNameFromUrl(e);
		episodeButton.addEventListener('click', async () => {
			openEntityModal(await api.getObject.fromUrl<Episode>(e));
		});
	});

	return container;
}

const getLocationModal = (location:Location) => {
	const container = document.createElement("section");
	container.appendChild(generateModalHeader({title: location.name}));
	container.appendChild(document.createElement("p")).textContent = location.type;
	container.appendChild(document.createElement("p")).textContent = location.dimension;
	
	container.appendChild(document.createElement("h3")).textContent = "Residents";
	
	const residents = container.appendChild(document.createElement("ul"));

	location.residents.forEach(async (c) => {
		const character = await api.getObject.fromUrl<Character>(c);
		if(!character)
			return;
		
		residents.appendChild(document.createElement("li")).appendChild(generateCard(character) as HTMLElement);
	});
	return container;
}

const getEpisodenModal = (episode:Episode) => {
	const container = document.createElement("section");
	container.appendChild(generateModalHeader({title: episode.name, suffix: `(Season ${parseSignature(episode.episode).season})`}));
	container.appendChild(document.createElement("p")).textContent = episode.air_date;
	container.appendChild(document.createElement("h2")).textContent = "Actors";

	const actors = container.appendChild(document.createElement("ul"));

	episode.characters.forEach(async (c) => {
		const character = await api.getObject.fromUrl<Character>(c);
		if(!character)
			return;
		
		actors.appendChild(document.createElement("li")).appendChild(generateCard(character) as HTMLElement);

	});

	return container;
}