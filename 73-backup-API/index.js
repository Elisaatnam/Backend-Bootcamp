import { fetchData, exists, setup } from "./lib.js";

// zuerst ordner erstellen
await setup();

// danach die fetchData Function
await fetchData();
