// https://rickandmortyapi.com/documentation/#character-schema

import Place from "./Place";

type Character = {
	id: number;
	name: string;
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	type: string;
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
	origin: Place;
	location: Place;
	image: string;
	episode: string[];
	url: string;
	created: string;
};

export default Character;