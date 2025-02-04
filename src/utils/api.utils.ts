import api from "../services/api";
import { Character, Endpoint, Entity, Episode } from "../types/api.types";

export const parseSignature = (signature: string): {season:number, episode:number} => {
	
	const match = signature.match(/S(\d+)E(\d+)/);
	
	if (!match) 
		return {season:-1, episode:-1};

	const seasonNumber = parseInt(match[1], 10);
	const episodeNumber = parseInt(match[2], 10);

	return {season: seasonNumber, episode: episodeNumber};
}

export const parseUrl = (url: string): string => {
	const parts = new URL(url).pathname.split("/").filter(Boolean);
	return parts.length > 1 ? parts[1] : "";
};


export const getEndpointName = (entity:Entity):Endpoint | null  => {

	const type = parseUrl(entity.url);

	return type as Endpoint | null;
}

export const getEpisodeNameFromUrl = async (url: string) => {
	const ret = (await api.getObject.fromUrl<Episode>(url))?.name;

	return ret ? ret : "UNKNOWN";
}

export const getCharacterNameAndImageFromUrl = async (url:string) => {
	
	const ret = (await api.getObject.fromUrl<Character>(url));

	return ret ? {name:ret.name, image:ret.image} : undefined;
}