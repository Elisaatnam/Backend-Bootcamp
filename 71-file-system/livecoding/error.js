function example() {
	if (true) {
		throw new Error("It's true. I'm an error");
	}

	return "this is a test";
}

let data;
try {
	data = example();
} catch (e) {
	console.log("error from catch(): ", e);
}

//Data ist undefined in unserem Bsp
//error
console.log({ data });
