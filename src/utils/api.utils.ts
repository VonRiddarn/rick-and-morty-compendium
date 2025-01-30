export const parseSignature = (signature: string): {season:number, episode:number} => {
	
	const match = signature.match(/S(\d+)E(\d+)/);
	
	if (!match) 
		return -1;

	const seasonNumber = parseInt(match[1], 10);
	const episodeNumber = parseInt(match[2], 10);

	return {season: seasonNumber, episode: episodeNumber};
}