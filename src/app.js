import * as Tone from "tone";
import { connectCube } from "./cube.js";
import { getNoteForMove, scales } from "./note.js";

const connBtn = document.getElementById("connect");
const clearBtn = document.getElementById("clear");
const status = document.getElementById("status");
const movesTxt = document.getElementById("moves");
const notesTxt = document.getElementById("notes");
const scaleSelect = document.getElementById("scale");
const keySelect = document.getElementById("key");

let synth;
let conn;

let moveHistory = [];
let noteHistory = [];

const MAX_HISTORY = 40;

function populateKeySelect() {
  Object.keys(scales).forEach(key => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    keySelect.appendChild(option);
  });
}

function populateScaleSelect(selectedKey) {
  scaleSelect.innerHTML = '';
  const availableScales = Object.keys(scales[selectedKey] || {});
  availableScales.forEach(scale => {
    const option = document.createElement('option');
    option.value = scale;
    option.textContent = scale;
    scaleSelect.appendChild(option);
  });
}

keySelect.addEventListener('change', () => {
  populateScaleSelect(keySelect.value);
});

populateKeySelect();
populateScaleSelect(keySelect.value || Object.keys(scales)[0]);

clearBtn.addEventListener("click", async () => {
    moveHistory = [];
    noteHistory = [];
    movesTxt.innerText = "";
    notesTxt.innerText = "";
})

connBtn.addEventListener("click", async () => {
    status.innerText = "Connecting...";

    await Tone.start();
    synth = new Tone.Synth().toDestination();

    try {
        conn = await connectCube();
        status.innerText = "Connection successful!\nMove the cube to play notes.";

        conn.events$.subscribe((event) => {
            if (event.type === "MOVE") {
                const move = event.move;
                const key = keySelect.value || "C";
                const scale = scaleSelect.value || "pentatonicC";
                const note = getNoteForMove(move, key, scale);

                status.innerText = `Move detected: ${move}, Note: ${note}`;
                
                moveHistory.push(move);
                noteHistory.push(note);

                if (moveHistory.length > MAX_HISTORY) {
                    moveHistory.shift();
                    noteHistory.shift();
                }

                movesTxt.innerText = moveHistory.join(" ");
                notesTxt.innerText = noteHistory.join(" ");

                if (note) synth.triggerAttackRelease(note, "8n");
            }
        });

        await conn.sendCubeCommand({ type: "REQUEST_FACELETS" });
    } catch (e) {
        status.innerText = 'Connection failed: ' + e;
        console.error(e);
    }
})