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

export const getEntityImage = (entity:Entity):HTMLElement => {

	// TODO: Error fallback image 
	// Change this to switch("lalala") to demonstrate that the error fallback image works.
	switch(getEndpointName(entity))
	{
		case "character":
		const cImg = document.createElement("img");
		cImg.src = (entity as Character).image;
		return cImg;

		case "location":
		const lImg = document.createElement("img");
		lImg.src = "/public/images/Icon_Location.png";
		return lImg;

		case "episode":
		const eSvg = document.createElement("div");
		fetch("/public/images/Icon_Episode_Dynamic.svg")
		.then(response => response.text())
		.then(svgContent => {
            eSvg.innerHTML = svgContent;

            const { season, episode } = parseSignature((entity as Episode).episode);

            setTimeout(() => {
                const seasonText = eSvg.querySelector("#seasonText");
                const episodeText = eSvg.querySelector("#episodeText");

                if (seasonText) seasonText.textContent = `Season ${season}`;
                if (episodeText) episodeText.textContent = `Episode ${episode}`;
            }, 0);
        })
		.catch(error => {
			console.error("Error loading svg:",error);
			eSvg.innerHTML = "Error";
		})
		return eSvg;

		default:
		console.error("COULD NOT FIND ENDPOINT OF CARD!");
		const errorImg = document.createElement("img");
		errorImg.src = "/public/images/Icon_Error.png";
		return errorImg;
	}
} 