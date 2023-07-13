import fs from "node:fs/promises";

const filePath = new URL("./package.json", import.meta.url);
const contents = await fs.readFile(filePath, { encoding: "utf8" });

//console.log(JSON.parse(contents), contents);

const packageJSON = JSON.parse(contents);

packageJSON.author = "Claire Grube <test@test.de>";

console.log(packageJSON);

await fs.writeFile(filePath, JSON.stringify(packageJSON, null, 2), {
	encoding: "utf8",
});
