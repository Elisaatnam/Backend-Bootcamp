import jwt from "jsonwebtoken";

//userEmailObj = {email: ""}  // persist = eingeloggt bleiben
export function generateAccessToken(userEmailOvb, persist = false) {
	return (
		jwt.sign(userEmailOvb, process.env.TOKEN_SECRET),
		"SECRET",
		{ expiresIn: persist ? "7d" : "4h" }
	);
}

export function authenicateToken(req, res, next) {
	let token = null;
	if (req?.cookies?.auth) {
		token = req.cookies.auth;
	}

	if (!token) {
		const authHeader = req.headers["authorization"];
		token = authHeader && authHeader.split(" ")[1];
	}

	if (token === null) {
		return res.sendStatus(401);
	}

	jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
		console.log(err, user);

		if (err) {
			return res.sendStatus(403);
		}

		req.userEmail = user.email;

		next();
	});
}
