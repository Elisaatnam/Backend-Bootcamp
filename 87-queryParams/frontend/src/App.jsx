import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
	const [status, setStatus] = useState();

	useEffect(() => {
		axios
			.get("/api/status", { params: { search: "wtf is params" } })
			.then(data => setStatus(data.status))
			.catch(err => {
				console.error(err);
				setStatus("error");
			});
	}, []);

	return <>API Status: {status}</>;
}

export default App;
