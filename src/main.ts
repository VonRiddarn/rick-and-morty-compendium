// TODO: Create categories and clone cors anywhere to local
// https://dev.to/saiavinashiitr/comment/19df0
// https://github.com/Rob--W/cors-anywhere

let main = document.querySelector("main") as HTMLElement;

const list = async (url: string) => {
	const response = await fetch(url);
	const data = await response.json();

	data.results.forEach((e: { image: string }) => {
		main.appendChild(document.createElement("img")).src = e.image;
	});

	return data.info.next;
};

(async () => {
	let nextUrl: string | null = "https://rickandmortyapi.com/api/character";
	while (nextUrl) {
		nextUrl = await list(nextUrl);
	}
})();