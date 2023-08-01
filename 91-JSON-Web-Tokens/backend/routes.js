import { Router } from "express";
import User from "./model.js";
import { authenicateToken, generateAccessToken } from "./authThoken.js";

export const userRouter = Router();

const hoursInMilisec = hours => {
	return 1000 * 60 * 60 * hours;
};

userRouter.get("/", async (req, res) => {
	const users = await User.find();
	res.send(users);
});

userRouter.post("/signup", async (req, res) => {
	const { name, email, password } = req.body;
	let user = new User({ name, email });
	user.setPassword(password);
	user = await user.save();

	res.send({ message: "New user created", data: user });
});

userRouter.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email }).select("+hash").select("+salt");
	//#dieses password wuerde dann wieder den gleichen hash produzieren (wie in der Datenbank)
	const passwordIsValid = user.verifyPassword(password);

	if (passwordIsValid) {
		//hier wird der JWT generiert, weil wir die generateAccessToken Funktion aufrufen
		const token = generateAccessToken({ email });
		console.log(token);
		res.cookie("auth", token, { httpOnly: true, maxAge: hoursInMilisec(4) }); //http only = cookie darf nicht vom frontend gelesen werden
		res.send({ message: "Success", data: user });
	} else {
		res.status(404).send({
			message: "Invalid Password",
			error: {
				message: "Email or Password is incorrect",
			},
		});
	}
});

userRouter.get("/secure", authenicateToken, async (req, res) => {
	console.log(req.userEmail);
	res.send("SUCCESS");
});
