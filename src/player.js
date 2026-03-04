import { TwistyPlayer } from "cubing/twisty";

export function renderCube(alg, container) {
    container.innerHtml = "";

    const player = new TwistyPlayer({
        puzzle: "3x3x3",
        alg: alg,
        hintFacelets: "none",
        background: "none"
    });

    container.appendChild(player);
}