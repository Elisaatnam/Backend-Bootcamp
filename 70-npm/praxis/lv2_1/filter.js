import { data } from "./cities.js";

export const bigCities = () => {
	let bigCit = data.filter(e => e.population > 100000);
	console.log(bigCit);
};

export const smallCities = () => {
	let smallCit = data.filter(e => e.population < 100000);
	console.log(smallCit);
};
