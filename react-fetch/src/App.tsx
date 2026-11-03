import type React from "react";
import { useState } from "react";
import PostList from "./components/PostList";
import SearchPosts from "./components/SearchPosts";
import { useGlobalContext } from "./hooks/useGlobalContext";
import { useGlobalUserProfile } from "./hooks/useGlobalUserProfile";
import { CustomHook } from "./components/CustomHook";

const App = (): React.JSX.Element => {
	// function handleSearch(searchTerm: string) {
	// 	console.log("Searching for: ", searchTerm);
	// }

	const { flag, setFlag } = useGlobalContext();
	const { phone, name, setPhone, setName } = useGlobalUserProfile();

	const handleProfileChange = (newPhone: string, newName: string): void => {
		setPhone(newPhone);
		setName(newName);
	};

	const [searchText, setSearchText] = useState("");

	return (
		<div>
			<SearchPosts handleSearch={setSearchText} />
			<PostList searchText={searchText} />
			<h2>Global Flag: {flag}</h2>
			<button onClick={() => setFlag("updated from App")}>Change flag</button>

			<hr />
			<p>My name: {name}</p>
			<p>My phone: {phone}</p>
			<button onClick={() => handleProfileChange("9007696162", "Rishaan")}>
				Change Profile Info
			</button>

			<hr />

			<CustomHook />
		</div>
	);
};

export default App;
