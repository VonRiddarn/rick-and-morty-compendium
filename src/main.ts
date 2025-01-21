import "./style.scss";
import { injectHeaderSvgs } from "./utils/pageManager";

// TODO: Prebuild page nodes and load node "main" from pageManager

injectHeaderSvgs();

const body = document.querySelector("body") as HTMLElement;

body.appendChild(document.createElement("p")).innerHTML = "Hello world!";