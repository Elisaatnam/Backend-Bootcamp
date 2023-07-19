import axios from "axios";
import { useRef } from "react";

const CreatePostForm = ({ setRefresh }) => {
	const titleRef = useRef();
	const contentRef = useRef();
	const authorRef = useRef();

	const handleSubmit = async () => {
		const newPost = {
			title: titleRef.current.value,
			content: contentRef.current.value,
			author: authorRef.current.value,
		};
		const { data } = await axios.post("/api/posts", newPost);
		console.log(data);

		setRefresh(prev => !prev);
	};

	return (
		<div>
			<input type='text' ref={titleRef} placeholder='title' />
			<input type='text' ref={contentRef} placeholder='content' />
			<input type='text' ref={authorRef} placeholder='author' />
			<button type='button' onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};

export default CreatePostForm;
