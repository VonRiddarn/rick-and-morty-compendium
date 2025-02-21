import "./entityNote.scss";
import { Entity } from "../../services/api.types";
import { getEndpointName } from "../../utils/api.utils";

// Due to how the notes are kept, we can easily parse them into API calls 
// and check if the saved endpoints are still valid. 
// This means we can get rid of redundant data if an Entity is removed from the database.
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

		const closeNote = (save: boolean) => {
			if(save)
			{
				if(textarea.value) {
					note = textarea.value;
					notes[key] = note;
				}
				else {
					if(note)
						delete notes[key];
					
					note = "";
				}
			}
			
			p.innerHTML = note ? note.replace(/\n/g, "<br>") : "No notes.";
			p.className = note ? "unselectable" : "entity-note-empty unselectable";
			// Only replace if textarea is still in the DOM
			if (section.contains(textarea)) {
				section.replaceChild(p, textarea);
			}

			// Scroll P to bottom so it's "in-line" with the input area
			p.scrollTop = p.scrollHeight;

			// Remove listener from potential modal area
			saveArea?.removeEventListener("mousedown", handleMouseDown);
			
			console.log(notes);
		};

		const handleMouseDown = (event: MouseEvent) => {
			if (event.target !== textarea) {
				closeNote(true);
				saveArea?.removeEventListener("mousedown", handleMouseDown);
			}
		};

		saveArea?.addEventListener("mousedown", handleMouseDown);

		// If key is escape, exit edit mode and do not save.
		textarea.addEventListener("keydown", (event) => {
			if(event.key === "Escape") {
				event.preventDefault();
				closeNote(false);
			}
		})

		// If enter is pressed with modifier Shift or Ctrl, save and exit edit mode.
		textarea.addEventListener("keypress", (event) => {
			// I'm the smartest man alive!
			// Combine a conditional with a scoped OR conditional to make more than 1 comparison!
			if (event.code === "Enter" && !event.shiftKey) {
				event.preventDefault();
				closeNote(true);
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
};

const getDictionaryKey = (entity: Entity) => {
	return `${getEndpointName(entity)}_${entity.id}`;
}