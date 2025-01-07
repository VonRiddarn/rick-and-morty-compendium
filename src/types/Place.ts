// https://rickandmortyapi.com/documentation/#location-schema
type Place = {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	created: string;
};

export default Place;