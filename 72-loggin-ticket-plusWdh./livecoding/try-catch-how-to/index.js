let whichIsOnline;
const [state, setState] = useState(true);

const saveFetch = async (...args) => {
	let data, error;
	try {
		data = await fetch(...args);
	} catch (e) {
		error = e;
	}

	return [error, data];
};

let isOnline = "none";
const [errGoogle, google] = await saveFetch("https://google.com");
if (google) {
	isOnline = "google";
} else {
	const [errYahoo, yahoo] = await saveFetch("https://yahoo.com");
	if (yahoo) {
		isOnline = "yahoo";
	}
}

//*++++++++++
try {
	const google = await fetch("https://google.com");
	whichIsOnline = "google";
} catch (e) {}

if (!whichIsOnline) {
	try {
		await fetch("https://yahoo.com");
		whichIsOnline = "yahoo";
	} catch (e) {
		whichIsOnline = "none";
	}
}

// import app from "./lib/app";

try {
	app();
} catch (e) {
	errorService(e);
}

try {
	try {
		fetch("");
	} catch (e) {}
} catch (e) {}
