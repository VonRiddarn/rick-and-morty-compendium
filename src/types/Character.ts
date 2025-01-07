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
	image: string; // URL
	episode: string[]; // URLs
	url: string; // endpoint
	created: string; // Time the character was created in the database
};

export default Character;