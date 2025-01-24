
// ----- ----- ENTITIES ----- -----

// https://rickandmortyapi.com/documentation/#character-schema
export type Character = {
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

// https://rickandmortyapi.com/documentation/#episode-schema
export type Episode = {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
};

// https://rickandmortyapi.com/documentation/#location-schema
export type Place = {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	created: string;
};

export type SearchResult<T> = {
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: T[];
};

// ----- ----- CUSTOM ----- -----

export type Entity = Character | Place | Episode;

export type Season = {
	name: string;
	episodes: EpisodeReference[];
}

export type EpisodeReference = {
	name: string;
	signature: string;
	url: string;
}

export type Endpoint = "character" | "location" | "episode";

export type Query = {
	key: string;
	value: string;
};

export type CharacterQuery = {
	key: "name" | "status" | "species" | "type" | "gender",
	value: string
}