// TODO: Export dynamic list of properties that can be used in the filter modal dropdowns.
// IT IS VERY IMPORTANT THAT WE ONLY RUN THIS AT INITIALIZATION - We do NOT want to get rate limited!

// Endpoints to crawl: 
/*

	Location
		Type
		Dimension
		Note: All types and dimensions can be collected in 7 calls.

	Episode
		Episode (S01E01)
		Notes: 
			Do not forget to parse all ansers.
			They can be typed like so:
			Season {
				name: "Season 1",
				episodes: [{
						name: "Pilot",
						url: "the.url-goes.here"
					}
				]
			} 

			This means that if both season and episode is selected in the filter, we can use the URL to just fetch that specific episode.
*/