import "./entityNote.scss";
import { Entity } from "../../types/api.types";
import { getEndpointName } from "../../utils/api.utils";

export const notes: { [key: string]: string } = {};

export const getEntityNoteComponent = (entity: Entity, saveArea?: HTMLElement) => {

	// Note: This replaces the newlines with HTML breaks so the notes are true to their input.
	// note.replace(/\n/g, "<br>")
	// I've got it in a few places so the note up is here

	// Define variables
	const key = getDictionaryKey(entity);
	let note = notes[key];

	// Initialize elements
	const section = document.createElement("section");
	section.className = "notes"

	const header = document.createElement("h3");
	header.textContent = "Notes";

	const p = document.createElement("p");
	p.innerHTML = note ? note.replace(/\n/g, "<br>") : "No notes.";
	p.className = note ? "unselectable" : "entity-note-empty unselectable";

	// When clicking the notes, enter edit mode.
	p.addEventListener("click", () => {
		// Do not create multiple textarea
		if (section.contains(document.querySelector("textarea"))) 
			return;

		const textarea = document.createElement("textarea");
		textarea.value = note || "";

		const saveNote = () => {
			if(textarea.value) {
				note = textarea.value;
				notes[key] = note;
			}
			else {
				if(note)
					delete notes[key];
				
				note = "";
			}
			
			p.innerHTML = note ? note.replace(/\n/g, "<br>") : "No notes.";
			p.className = note ? "unselectable" : "entity-note-empty unselectable";
			// Only replace if textarea is still in the DOM
			if (section.contains(textarea)) {
				section.replaceChild(p, textarea);
			}

			// Scroll P to bottom so it's "in-line" with the input area
			p.scrollTop = p.scrollHeight;

			console.log(notes);
		};

		const handleMouseDown = (event: MouseEvent) => {
			if (event.target !== textarea) {
				saveNote();
				saveArea?.removeEventListener("mousedown", handleMouseDown);
			}
		};

		saveArea?.addEventListener("mousedown", handleMouseDown);

		textarea.addEventListener("keypress", (event) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				saveNote();
				saveArea?.removeEventListener("mousedown", handleMouseDown);
			}
		});

		// Ensure we replace only if p is still there
		if (section.contains(p)) {
			section.replaceChild(textarea, p);
		}

		textarea.focus();
	});

	section.append(header, p);

	return section;
}

const getDictionaryKey = (entity: Entity) => {
	return `${getEndpointName(entity)}_${entity.id}`;
}