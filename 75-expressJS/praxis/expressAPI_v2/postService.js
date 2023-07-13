import fs from "node:fs/promises";

const postsFileURL = new URL("./data/posts.json", import.meta.url);

export const getPosts = async () => {
	let fileContent = await fs.readFile(postsFileURL, { encoding: "utf8" });

	fileContent = JSON.parse(fileContent);

	return fileContent;
};

export const getPostById = async () => {
	const allPosts = await getPosts();
	let singlePost;

	//alternativ eine arry methode benutzen... wie.find()/.filter()
	for (let i = 0; i < allPosts.length; i++) {
		const post = allPosts[i];
		if (id === post[i]) {
			singlePost = post;
			continue;
		}
	}

	return singlePost;
};
