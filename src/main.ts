import { initializeHeader } from "./components/layout/header/header";
import { initializeCrawledValues, seasons, types } from "./services/api.crawler";
import "./style.scss";
import { pageManager } from "./page-manager/pageManager";
import pageRepository from "./page-manager/pageRepository";


// TODO: Prebuild page nodes and load node "main" from pageManager

const main = document.querySelector("main") as HTMLElement;

main.appendChild(document.createElement("p")).innerHTML = "Hello world!";

initializeHeader();
pageManager.switchPage(pageRepository.pages.main);


// TODO: Edit this flow of data.
// I'm not sure how SOC it is to call an initializer like this with no return value?
// Maybe it'll be alright if it's documented properly?
await initializeCrawledValues();
console.log(seasons);
console.log(types);