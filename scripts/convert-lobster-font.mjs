import fs from 'fs';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

const inputPath = new URL('../public/fonts/Lobster-Regular.ttf', import.meta.url);
const outputPath = new URL('../public/fonts/Lobster_Regular.json', import.meta.url);

const data = fs.readFileSync(inputPath);
const ab = data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength);
const loader = new TTFLoader();
const fontJson = loader.parse(ab);
fs.writeFileSync(outputPath, JSON.stringify(fontJson, null, 2));
console.log('Created', outputPath.pathname);
