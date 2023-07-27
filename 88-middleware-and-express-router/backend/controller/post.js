import express from "express";

const postRouter = express.Router();

postRouter.use("/", logger);

postRouter.get("/", logger, async (req, res, next) => {
	const data = await Post.find();
	if (!data) {
		req.fail = true;
		next();
	}
	res.json(data);
});

export default postRouter;
