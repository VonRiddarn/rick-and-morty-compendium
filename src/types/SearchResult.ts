type SearchResult<T> = {
	error?: string;
	info: {
		count: number;
		pages: number;
		next: string | null;
		prev: string | null;
	};
	results: T[];
};

export default SearchResult;