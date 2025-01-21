import "./style.scss";

// TODO: Prebuild page nodes and load node "main" from pageManager

const main = document.querySelector("main") as HTMLElement;

main.appendChild(document.createElement("p")).innerHTML = "Hello world!";