import { Page } from "../enums/pageManager.enums";
import { svgRepository } from "./svgRepository";

const header = document.querySelector("header") as HTMLElement;
const main = document.querySelector("main") as HTMLElement;

let currentPage = Page.Main;

export const pageManager = {

	// TODO: Add stuff!

} as const;

export const injectHeaderSvgs = () => {
	const btns = header.querySelectorAll("button");
	btns[0].innerHTML = svgRepository.backIcon;
	btns[1].innerHTML = svgRepository.filterIcon;
	btns[2].innerHTML = svgRepository.heartIcon;
};