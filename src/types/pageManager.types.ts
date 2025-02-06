import { HeaderType } from "../components/layout/header/header.enums";

export type Page = {
	uid: string,
	header: {
		title: string,
		type: HeaderType
	},
	node: HTMLElement,
	init: () => void;
	enter: () => void,
	exit: () => void,
};