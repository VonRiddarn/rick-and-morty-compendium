import "./entityNote.scss";
import { Entity } from "../../types/api.types";
import { getEndpointName } from "../../utils/api.utils";

export const notes: { [key: string]: string } = {};

export const getEntityNoteComponent = (entity: Entity) => {

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
		const textarea = document.createElement("textarea");
		textarea.value = note || "";
		const saveButton = document.createElement("button");
		saveButton.textContent = "Save";

		const saveNote = () => {
			note = textarea.value;
			notes[key] = note;
			p.innerHTML = note ? note.replace(/\n/g, "<br>") : "No notes.";
			p.className = note ? "unselectable" : "entity-note-empty unselectable";
			section.replaceChild(p, textarea);
			section.removeChild(saveButton);

			// Scroll P to bottom so it's "in line" with the input area
			p.scrollTop = p.scrollHeight;
		};

		saveButton.addEventListener("click", saveNote);

		textarea.addEventListener("keypress", (event) => {
			if (event.key === "Enter" && !event.shiftKey) {
				event.preventDefault();
				saveNote();
			}
		});

		section.replaceChild(textarea, p);
		section.appendChild(saveButton);
		textarea.focus();
	});

	section.append(header, p);

	return section;
}

const getDictionaryKey = (entity: Entity) => {
	return `${getEndpointName(entity)}_${entity.id}`;
}