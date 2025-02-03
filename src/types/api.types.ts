
// ----- ----- ENTITIES ----- -----

export type Entity = {
	id: number;
	name: string;
	url: string;
}

// https://rickandmortyapi.com/documentation/#character-schema
export type Character = Entity & {
	status: 'Alive' | 'Dead' | 'unknown';
	species: string;
	type: string;
	gender: 'Female' | 'Male' | 'Genderless' | 'unknown';
	origin: LocationReference;
	location: LocationReference;
	image: string;
	episode: string[];
	created: string;
};

// https://rickandmortyapi.com/documentation/#episode-schema
export type Episode = Entity & {
	air_date: string;
	episode: string;
	characters: string[];
	created: string;
};

// https://rickandmortyapi.com/documentation/#location-schema
export type Location = Entity & {
	type: string;
	dimension: string;
	residents: string[];
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

export type LocationReference = {
	name: string;
	url: string;
}

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