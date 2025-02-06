import "./style.scss";
import { initializeCrawledValues, seasons, types } from "./services/api.crawler";
import { openFilterModal } from "./components/modal/modal";
import { getEntityCardsFromPagnation, getEntityCardsFromSearch } from "./utils/getEntityCards";

const container = document.querySelector("#card-container") as HTMLElement;

document.querySelector("header")?.querySelector("button")?.addEventListener('click', () => {
	openFilterModal();
});

document.querySelectorAll(".button-previous").forEach((btn) => {
	btn.addEventListener('click', async () => {
		updateCardContainer(await getEntityCardsFromPagnation("previous"));
	});
});

document.querySelectorAll(".button-next").forEach((btn) => {
	btn.addEventListener('click', async () => {
		updateCardContainer(await getEntityCardsFromPagnation("next"));
	});
});

const updateCardContainer = (cards:HTMLElement[]) => {
	if(cards.length <= 0)
		return;
	
	container.innerHTML = "";

	cards.forEach((c) => container.appendChild(c));
}

await initializeCrawledValues();

container.appendChild(document.createElement("p")).textContent = "dsjakdjaskdsjakdsajds";

updateCardContainer(await getEntityCardsFromSearch("character"));

console.log(seasons);
console.log(types);


