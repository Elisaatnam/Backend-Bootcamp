/**
 *
 * Objects
 *
 */

// const person_name = "Frida Kahlo";
// const person_age = 18;

// // Short notation for...
// const myObj = {
//   age: 18,
//   name: "Frida Kahlo",
// };

// // this
// const myObj2 = new Object();
// myObj2.age = 100;
// myObj2.name = "Frida Kahlo";

// myObj2["bro"] = "It's bracket notation!";

// myObj2["job title"] = "Dev";

// myObj2[0] = "Something";
// myObj2[1] = "Something else";
// console.log({ myObj2 });

// function empty() {}
// // try{}

// let isGoodDay = true;
// const day = "Monday";
// if (day === "Monday") {
//   isGoodDay = false;
// }

// function newDev(name) {
//   return { name, dev: true };
// }

// newDev["is cool function"] = true;

// const dev = newDev("Frida");
// console.log({ dev, isIt: newDev["is cool function"] });

const aObj = { name: "Frida" }; // RAM Platz: 1
aObj.age = 18;
console.log(aObj);

const bObj = { ...aObj }; // bObj zeigt auf RAM Platz: 1
const otherCopy = Object.assign({}, bObj, {});
bObj.name = "Bernd";
bObj.age = 19;

console.log(aObj, aObj === bObj);

const sourceArr = [1, 2, 3];
const arr = sourceArr.map(num => num * 2);
console.log({ sourceArr, arr });

// [...unsorted].sort()
