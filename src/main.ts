import "./style.scss";

// TODO: Prebuild page nodes and load node "main" from pageManager

const body = document.querySelector("body") as HTMLElement;

body.appendChild(document.createElement("p")).innerHTML = "Hello world!";


// TODO: Add pageStateMachine
/* 
Page state machine or "page manager" manages the state of pages.
When chanign state from, say, "main" to "favorites", the header is updated and the main node is switched to
the appropriate cahced one.
*/