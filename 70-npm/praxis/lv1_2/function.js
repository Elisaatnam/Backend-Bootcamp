export const firstElm = arr => console.log(arr[0]);

export const allButLast = arr => {
	let newArr = arr.slice(0, arr.length - 1);
	console.log(newArr);
};

export const onlyLast = arr => console.log(arr[arr.length - 1]);

export const allButFirst = arr => {
	let newArr = arr.slice(1, arr.length);
	console.log(newArr);
};

export const remove = (arr, elm) => {
	let newArr = arr.filter(item => item !== elm);
	console.log(newArr);
};

export const removeDuplicates = arr => {
	// Erstelle ein neues Array, das nur eindeutige Elemente enthält

	// Das "filter" Array-Methode wird verwendet, um ein neues Array zu erstellen.
	// Die "filter" Methode durchläuft jedes Element des ursprünglichen Arrays.

	// Für jedes Element wird die "indexOf" Methode aufgerufen, um den Index des aktuellen Elements im Array zu finden.
	// Die "indexOf" Methode gibt den Index des ersten Auftretens des Elements zurück.

	// Der Vergleich "arr.indexOf(item) === index" überprüft, ob der aktuelle Index dem Index des ersten Auftretens des Elements entspricht.
	// Wenn der Index gleich ist, bedeutet das, dass das aktuelle Element zum ersten Mal im Array gefunden wurde und eindeutig ist.
	// In diesem Fall wird das Element im neuen Array beibehalten.

	// Durch die Verwendung des "filter" und "indexOf" Mechanismus wird ein Array erstellt, das nur eindeutige Elemente enthält.
	let newArr = arr.filter((item, index) => arr.indexOf(item) === index);

	// Das neue Array ohne Duplikate wird ausgegeben
	console.log(newArr);
};

export const removeDuplicates2 = arr => {
	// Erstelle ein neues Array, das nur eindeutige Elemente enthält, indem ein Set verwendet wird

	// Ein Set ist eine spezielle Datenstruktur, die nur eindeutige Elemente speichert.
	// Durch die Verwendung des Spread-Operators "..." wird das ursprüngliche Array in ein neues Array kopiert.

	// Das Set nimmt automatisch nur eindeutige Elemente auf und entfernt Duplikate.
	// Da ein Set nur eindeutige Elemente enthält, wird das neue Array nur diese eindeutigen Elemente enthalten.

	// Durch die Verwendung des Set-Mechanismus wird ein Array erstellt, das nur eindeutige Elemente enthält.
	let newArr = [...new Set(arr)];

	// Das neue Array ohne Duplikate wird ausgegeben
	console.log(newArr);
};

export const summe = arr => {
	let total = 0;
	for (let i of arr) {
		total += i;
	}
	console.log(total);
};

export const randomNum = (num1, num2) => {
	let randomNumber = Math.floor(Math.random() * (num2 - num1) + num1);
	console.log(randomNumber);
};

export const firstLetter = word => {
	//ich nehme mir vom parameter (word) das Zeichen(char) an index 0 und wandle das in uppercase um und nun fuege ich den rest des wortes also ab index 1 bis word.lenght hinzu
	let newWord = word.charAt().toUpperCase() + word.slice(1, word.length);
	console.log(newWord);
};

export const uppercase = word => {
	let neWord = word.toUpperCase();
	console.log(neWord);
};

export const pruefen = (word, char) => {
	let trueOrFalse = word.toLowerCase().charAt(word.lenght).includes(char);
	console.log(trueOrFalse);
};
