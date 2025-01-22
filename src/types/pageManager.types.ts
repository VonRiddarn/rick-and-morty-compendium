import { HeaderType } from "../enums/header.enums";

export type Page = {
	uid: string,
	header: {
		title: string,
		type: HeaderType
	},
	node: HTMLElement,
	enter: () => void,
	exit: () => void,
};