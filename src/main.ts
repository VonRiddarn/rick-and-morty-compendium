import { initializeHeader } from "./components/layout/header/header";
import { getAllSeasons } from "./services/api.crawler";
import "./style.scss";
import { pageManager } from "./utils/page-manager/pageManager";
import pageRepository from "./utils/page-manager/pageRepository";


// TODO: Prebuild page nodes and load node "main" from pageManager

const main = document.querySelector("main") as HTMLElement;

main.appendChild(document.createElement("p")).innerHTML = "Hello world!";

initializeHeader();
pageManager.switchPage(pageRepository.pages.main);

getAllSeasons();