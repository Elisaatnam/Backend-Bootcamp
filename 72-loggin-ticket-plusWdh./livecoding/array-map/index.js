//!hier haben wir ein eigenes Map geschrieben - const arrayMap akzeptiert 2 props arr und eine Funktion(mapFunc)
const arrayMap = (arr, mapFunc) => {
	/* const newArr = new Array(arr.length); //*bessere performance */

	//for of
	/* for (let element of arr) {
		//map function benutzen
		const mapFuncResult = mapFunc(element);
		//Resultat in d neue Array pushen
		newArr.push(mapFuncResult);
	} */

	//for loop
	const newArr = [];
	for (let i = 0; i < arr.length; i++) {
		const elm = arr[i];
		const mapFnResult = mapFunc(elm, i, arr);
		newArr.push(mapFnResult);
	}

	return newArr;
};

const result = arrayMap([1, 2, 3], num => num * 2);
console.log(result);

//* TEST/ueberpruefen
if (result[0] === 2 && result[1] === 4 && result[2] === 6) {
	console.log("Yes!!");
} else {
	console.log("Noooopeee");
}
