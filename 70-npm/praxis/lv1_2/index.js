import { names } from "./data.js";
import { numbers } from "./data.js";
import {
	allButFirst,
	allButLast,
	firstElm,
	onlyLast,
	remove,
	removeDuplicates,
	removeDuplicates2,
	randomNum,
	summe,
	firstLetter,
	uppercase,
	pruefen,
} from "./function.js";

firstElm(names);
firstElm(numbers);
allButLast(names);
allButLast(numbers);
onlyLast(names);
onlyLast(numbers);
allButFirst(names);
allButFirst(numbers);
remove(names, "Christian");
remove(numbers, 55);
removeDuplicates(numbers);
removeDuplicates2(numbers);
summe(numbers);
randomNum(11, 25);
firstLetter("roman");
firstLetter("alpy");
firstLetter("chris");
uppercase("elisa");
uppercase("ankor");
pruefen("Test", "t");
pruefen("Test", "q");
