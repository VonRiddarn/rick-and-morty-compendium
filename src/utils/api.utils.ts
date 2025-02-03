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