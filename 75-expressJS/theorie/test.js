let name = 'christian'

function changeName(name) {
    name = 'Peters'
    console.log(name);
}
changeName(name)
console.log(name);

let person = { name: 'Magda' }

function changePersonName(person) {
    person.name = 'Cale'
}

changePersonName(person)
console.log(person);