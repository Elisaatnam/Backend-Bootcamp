import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import postRouter from "./controller/post";

//!Post Router importieren
import { postRouter } from "./controller/post";

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.PORT || 3000;
const app = express();

const ReactAppDistPath = new URL("../frontend/dist/", import.meta.url);
const ReactAppIndex = new URL("../frontend/dist/index.html", import.meta.url);

app.use(express.json());
app.use(express.static(ReactAppDistPath.pathname));

//app.use(morgan("dev"));
//morgan selber quasi nachgebaut
const logger = (req, res, next) => {
	console.log(`${req.method} request on ${req.url}`);
	next();
};

/*
 * express.static matched auf jede Datei im angegebenen Ordner
 * und erstellt uns einen request handler for FREE
 * app.get("/",(req,res)=> res.sendFile("path/to/index.html"))
 * app.get("/index.html",(req,res)=> res.sendFile("path/to/index.html"))
 */

//!Router
app.use("/api/posts", postRouter);

app.get("/api/status", (req, res) => {
	res.send({ status: "Ok" });
});

app.use((req, res, next) => {
	if (req.fail) {
		res.status(500).json({ error: "FAIL" });
	} else {
		next();
	}
});

app.get("/*", (req, res) => {
	res.sendFile(ReactAppIndex.pathname);
});

app.listen(PORT, () => {
	console.log("Server running on Port: ", PORT);
});
