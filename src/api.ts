import Character from "./types/Character";

type CharacterQuery = {
	key: string;
	value: string;
};

const api = Object.freeze({
	getCharacters: {
		fromIds: async (ids: number[]): Promise<Character[]> => {
			throw new Error("Not implemented");
		},

		fromPage: async (page: number): Promise<Character[]> => {
			throw new Error("Not implemented");
		},

		fromName: async (name: string): Promise<Character[]> => {
			throw new Error("Not implemented");
		},

		fromUrls: async (urls: string[]): Promise<Character[]> => {
			throw new Error("Not implemented");
		}
	},
	getCharacter: {
		fromId: async (id: number): Promise<Character> => {
			throw new Error("Not implemented");
		},
		fromUrl: async (url: string): Promise<Character> => {
			throw new Error("Not implemented");
		}
	}
});

const getEndPoint = (point: "character" | "location" | "episode"): string => {
	return `https://rickandmortyapi.com/api/${point}/`;
}

// TODO: Find a way to build any queries that we want to attatch to the get methods.
// This will probably include us getting this from the utilities?

/*const buildQueryString = (params: CharacterQuery[]): string => {
    return params.map(({ key, value }) => `${key}=${value}`).join("&");
};*/