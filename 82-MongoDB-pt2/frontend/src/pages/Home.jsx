import axios from "axios";
import { useEffect, useState } from "react";
import CreatePostForm from "../components/CreatPostForm";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const [refresh, setRefresh] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get("/api/posts");
			setPosts(data);
		};
		fetchData();
	}, [refresh]);

	const handleDelete = async postId => {
		try {
			const { data } = await axios.delete(`/api/deletePost/${postId}`);
			setRefresh(prev => !prev);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<main>
			<CreatePostForm setRefresh={setRefresh} />
			{posts.map(post => (
				<div className='postWrapper' key={post._id}>
					<h4>{post.title}</h4>
					<p>{post.content}</p>
					<button onClick={() => handleDelete(post._id)}>Delete</button>
				</div>
			))}
		</main>
	);
};

export default Home;
