type Query = {
	key: string;
	value: string;
};

type CharacterQuery = {
	key: "name" | "status" | "species" | "type" | "gender",
	value: string
}

export default Query;