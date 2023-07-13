//#  noch ein ansatz ------Currying Function----------------------

import fs from "node:fs/promises";

const logFolder = new URL("./logs", import.meta.url);
const logFile = new URL("./logs/logs.txt", import.meta.url);

const exists = async path => {
	let exists;
	try {
		await fs.access(path, fs.constants.W_OK);
		exists = true;
	} catch (err) {
		exists = false;
	}

	return exists;
};

let isSetup = false;
const setup = async () => {
	if (isSetup) return;
	const hasFolder = await exists(logFolder);

	if (!hasFolder) {
		await fs.mkdir(logFolder);
	}

	isSetup = true;
};

const createLogMessage = (txt, logLevel) => {
	const time = new Date().toUTCString();
	let message = `${time} :: ${txt}\n`;
	if (logLevel) {
		message = `${logLevel} :: ${message}`;
	}
	return message;
};

export const log = async (logtxt, logLevel = "INFO") => {
	await setup();
	const message = createLogMessage(logtxt, logLevel);
	await fs.appendFile(logFile, message, { encoding: "utf8" });
};

//* ===== Currying function =======

const createLogLevelFunction = LOG_LEVEL => {
	return async logtxt => {
		const errorFile = new URL(
			`./logs/${LOG_LEVEL.toLocaleLowerCase()}.txt`,
			import.meta.url,
		);
		await setup();
		await log(logtxt, LOG_LEVEL);
		await fs.appendFile(errorFile, createLogMessage(logtxt), {
			encoding: "utf8",
		});
	};
};
log.error = createLogLevelFunction("ERROR");
log.warn = createLogLevelFunction("WARN");
log.info = createLogLevelFunction("INFO");

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
/* import fs from "node:fs";
import fsPromise, { mkdir } from "node:fs/promises";

//! ich uebergebe 2 Parameter einmal die Message und dann noch in welche log Datei es geschrieben werden soll
export const writeLog = async (message, logInWhichPath = "log") => {
	//! Variablen
	const pathLogsDir = new URL("./logs", import.meta.url);
	const pathLogTxt = new URL("./logs/log.txt", import.meta.url);
	const messageWithDate = `${new Date().toUTCString()} - ${message}`;
	const newPath = new URL(`./logs/${logInWhichPath}.txt`, import.meta.url);

	//! Logs Ordner erstellen
	try {
		if (fs.existsSync(pathLogsDir)) {
			console.log("Dirctory exists");
		} else {
			await fsPromise.mkdir(pathLogsDir);
			console.log("Directory not found, created new Dir");
		}
	} catch (err) {
		console.error("error creating the Dir", err);
	}

	//! log Datei(en) erstellen

	try {
		if (fs.existsSync(pathLogTxt)) {
			console.log("File exists");

			//!so oder so die message in die log.txt schreiben
			await fsPromise.appendFile(pathLogTxt, messageWithDate);

			//!wenn d message in was anderes als die log.txt eingespeichert werden soll
			if (logInWhichPath !== "log") {
				if (fs.existsSync(newPath)) {
					console.log(`${logInWhichPath}.txt already exists`);
					await fsPromise.appendFile(newPath, messageWithDate);
					await fsPromise.appendFile(pathLogTxt, messageWithDate);
				} else {
					await fsPromise.writeFile(newPath, `${logInWhichPath} Logs:`);
				}
			}
		} else {
			await fsPromise.writeFile(pathLogTxt, "LOGS:");
			console.log("created new File log.txt");
		}
	} catch (err) {
		console.error("error creating the file", err);
	}
}; */

/* 
//* ACHTUNG hier nur Level 1 und 2
export const writeLog = async message => {
	//! Logs Ordner erstellen
	try {
		const pathLogsDir = new URL("./logs", import.meta.url);

		if (fs.existsSync(pathLogsDir)) {
			console.log("Dirctory exists");
		} else {
			await fsPromise.mkdir(pathLogsDir);
			console.log("Directory not found, created new Dir");
		}
	} catch (err) {
		throw err;
	}

	//! log Datei erstellen

	try {
		const pathLogTxt = new URL("./logs/log.txt", import.meta.url);
		if (fs.existsSync(pathLogTxt)) {
			console.log("File exists");

			const messageWithDate = `${new Date().toUTCString()} - ${message}`;

			await fsPromise.appendFile(pathLogTxt, messageWithDate);
		} else {
			await fsPromise.writeFile(pathLogTxt, "LOGS:");
			console.log("File not found, created new File");
		}
	} catch (err) {
		console.error("error creating the file", err);
	}
};

 */
