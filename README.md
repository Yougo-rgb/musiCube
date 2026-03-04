# musiCube
> Turn your GAN Smart Cube into a musical instrument 🎵

musiCube is a web application that connects to compatible GAN Smart Cubes via Bluetooth and transforms cube moves into musical notes in real time.

---

## ✨ Features

- 🔵 Connect to a compatible GAN Smart Cube via Web Bluetooth  
- 🎼 Select a key from the full chromatic scale  
- 🎵 Choose between multiple scales:
  - Major
  - Minor
  - Pentatonic
  - Blues
- 🎹 Real-time sound generation using Web Audio

---

## 🚀 Installation

### 1. Prerequisites

You need **Node.js** installed on your computer.  
npm is included automatically with Node.js.

Download it here:  
👉 https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
````

---

### 2. Clone the repository

```bash
git clone https://github.com/Yougo-rgb/musiCube.git
cd musiCube
```

---

### 3. Install dependencies

```bash
npm install
```

---

### 4. Start the development server

This project uses **Vite**.

```bash
npm run dev
```

Then open the local URL displayed in your terminal:

```
http://localhost:5173
```

---

## 🎮 Usage

1. Click **Connect**
2. Authorize Bluetooth access in your browser
3. Turn a face on your cube and wait for the app to detect it
4. Select a key and scale
5. Start turning your cube to generate music 🎶

---

## 🌐 Browser Compatibility

This project requires **Web Bluetooth API**, which is not supported in all browsers.

### Desktop (Windows / macOS / Android)

Use **Google Chrome** and enable:

```
chrome://flags/#enable-experimental-web-platform-features
```

Restart your browser after enabling the flag.

### iOS / iPadOS

Use the **Bluefy** browser and enable:

```
ENABLE BLE Advertisement
```

in the browser settings.

---

## 🕹️ Cube Compatibility
You can find the list of supported devices with gan-web-bluetooth in the readme:     
👉 https://github.com/afedotov/gan-web-bluetooth?tab=readme-ov-file#gan-smart-cubes

## 🛠 Technologies Used

* HTML / CSS / JavaScript
* [Vite](https://github.com/vitejs/vite) (build tool)
* [Tone.js](https://github.com/Tonejs/Tone.js) (Web Audio)
* [Cubing.js](https://github.com/cubing/cubing.js) (3D cube rendering)
* [gan-web-bluetooth](https://github.com/afedotov/gan-web-bluetooth) (GAN Smart Cube connection)
* [RxJS](https://github.com/ReactiveX/rxjs) (event handling)
* GitHub Pages (deployment)

---

## 📡 Deployment

The project is deployed using **GitHub Pages**.

To build for production:

```bash
npm run build
```

Then deploy the `dist/` folder on the gh-pages branch.

---

## 🤝 Credits

* [Cubing.js](https://github.com/cubing/cubing.js) — 3D cube rendering
* [gan-web-bluetooth](https://github.com/afedotov/gan-web-bluetooth) — GAN Smart Cube communication
* [Tone.js](https://github.com/Tonejs/Tone.js) — Real-time audio synthesis