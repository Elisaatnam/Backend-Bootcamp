import express from "express";

const app = express();
const PORT = 9899;

/**
 * Wir wollen einen Autohandel simulieren
 * wir brauchen folgende Routen
 * a wir wollen alle Autos
 * b wir erzeugen eine neues auto
 * c wir wollen ein bestimmtes auto
 */

// POST     -> Create
// GET      -> Read
// PUT      -> Update
// DELETE   -> Delete

const cars = [];
let id = 0;
function getId(car) {
	id += 1;
	car.id = id;
}

// Middleware zum auslesen des Bodys, wenn dieser Daten im JSON Format beinhaltet
// Bodyparser
app.use(express.json());

app.get("/cars", (req, res) => {
	res.json(cars);
});

// ein neues auto erstellen
app.post("/cars", (req, res) => {
	const car = req.body;
	getId(car);
	cars.push(car);
	res.json(cars);
});

app.delete("/cars", (req, res) => {
	console.log("Schau dir mal meinen Body:", req.body);
	// Object destructuring
	// {id:4, name:"Christian", ort:"Berlin"}
	const { id } = req.body;
	console.log(id);
	cars.map((item, key, arr) => {
		if (item.id === id) {
			arr.splice(key, 1);
		}
	});
	res.json(cars);
});

app.listen(PORT, () =>
	console.log("Ich stehe vor der Tür mit der Nummer", PORT),
);
