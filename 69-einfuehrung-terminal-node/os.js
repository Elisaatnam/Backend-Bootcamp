import os from "os";

let bytes = os.freemem();
let kbytes = bytes / 1000;
let mbytes = kbytes / 1000;
let gb = mbytes / 1000;
console.log(`free memory: ${gb} GB`);
