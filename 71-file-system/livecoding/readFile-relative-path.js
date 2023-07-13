import fs from "node:fs/promises";

const filePath = new URL("./input.txt", import.meta.url);
console.log({
	pfad_dieser_datei: import.meta.url,
	pfad_absolut_input_txt: filePath,
});

const fsPromiseData = await fs.readFile("./input.txt", { encoding: "utf8" });

console.log(fsPromiseData);
