import "./modal.scss";


export const createModal = () => {
	const root = document.createElement("div");
	root.classList.add("modal");

	const modal = root.appendChild(document.createElement("div"));
	
	root.addEventListener('click', (event) => {if(event.target === root) closeModal(root)});
	
	// Cool way of making a one liner - use the closeModal method as an AND conditional to make it run
	const escClose = (event: KeyboardEvent) => event.key === "Escape" && closeModal(root);

	const closeModal = (modalRoot:HTMLElement) => {
		modalRoot.remove();
		document.removeEventListener('keydown', escClose);
	}
	return root;
}
