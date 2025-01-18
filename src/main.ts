import "./style.scss";

// TODO: Prebuild page nodes and load node "main" from pageManager

const body = document.querySelector("body") as HTMLElement;

body.appendChild(document.createElement("p")).innerHTML = "Hello world!";