import * as Tone from "tone";
import { connectCube } from "./cube.js";
import { getNoteForMove, scales } from "./note.js";
import { renderCube } from "./player.js";

const connBtn = document.getElementById("connect");
const clearBtn = document.getElementById("clear");
const statusTxt = document.getElementById("status");
const movesTxt = document.getElementById("moves");
const notesTxt = document.getElementById("notes");
const scaleSelect = document.getElementById("scale");
const keySelect = document.getElementById("key");
const copyableDivs = document.querySelectorAll(".copyable");
const cube = document.getElementById("cube");

let synth;
let conn;
let moveHistory = [];
let noteHistory = [];
let moveHistoryFromStart = [];

const MAX_HISTORY = 120;

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

populateKeySelect();
populateScaleSelect(keySelect.value || Object.keys(scales)[0]);

copyableDivs.forEach(div => {
  div.addEventListener("click", () => {
    const text = div.innerText;

    if (text !== "Moves" && text !== "Notes") {
      navigator.clipboard.writeText(text)
        .then(() => {
          statusTxt.innerText = `"${text}" copied !`;
        })
        .catch(e => {
          statusTxt.innerText = "Failed to copy : " + e;
          console.error("Failed to copy :", e);
        });
    } else {
      statusTxt.innerText = `Try to play a note before copying !`;
    }
  });
});

keySelect.addEventListener('change', () => {
  populateScaleSelect(keySelect.value);
});

clearBtn.addEventListener("click", async () => {
  moveHistory = [];
  noteHistory = [];
  moveHistoryFromStart = [];
  statusTxt.innerText = "Status";
  movesTxt.innerText = "Moves";
  notesTxt.innerText = "Notes";

  cube.innerHTML = "";
});

connBtn.addEventListener("click", async () => {
  statusTxt.innerText = "Connecting...";

  await Tone.start();
  synth = new Tone.Synth().toDestination();

  try {
      conn = await connectCube();
      statusTxt.innerText = "Connection successful!\nMove the cube to play notes.";

      conn.events$.subscribe((event) => {
          if (event.type === "MOVE") {
              const move = event.move;
              const key = keySelect.value || "C";
              const scale = scaleSelect.value || "pentatonicC";
              const note = getNoteForMove(move, key, scale);

              statusTxt.innerText = `Move detected: ${move}, Note: ${note}`;
              
              moveHistory.push(move);
              noteHistory.push(note);
              moveHistoryFromStart.push(move);

              if (moveHistory.length > MAX_HISTORY) {
                  moveHistory.shift();
                  noteHistory.shift();
              }

              movesTxt.innerText = moveHistory.join(" ");
              notesTxt.innerText = noteHistory.join(" ");

              cube.innerHTML = "";
              renderCube(moveHistoryFromStart.join(" "), cube);

              if (note) synth.triggerAttackRelease(note, "8n");
          }
      });

      await conn.sendCubeCommand({ type: "REQUEST_FACELETS" });
  } catch (e) {
      statusTxt.innerHTML = `<p>Connection failed: ${e} <br> ⚠️ Your brower may not be compatible ! <br>Check a list of <a href="https://github.com/WebBluetoothCG/web-bluetooth/blob/main/implementation-status.md" target="_blank">supported browers here</a> or <a href="https://gist.github.com/afedotov/52057533a8b27a0277598160c384ae71" target="_blank">GAN Smart Cubes MAC address FAQ here</a>.</p>`
      console.error(e);
  }
})