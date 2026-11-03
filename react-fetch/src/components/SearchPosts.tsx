import { useState, type ChangeEvent, type SubmitEvent } from "react";

type SearchPostProps = {
	handleSearch: (searchTerm: string) => void;
};

export default function SearchPosts({ handleSearch }: SearchPostProps) {
	const [inputVal, setInputVal] = useState("");

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputVal(e.target.value);
	};

	const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSearch(inputVal.trim());
		setInputVal("");
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				value={inputVal}
				placeholder='Search posts'
				onChange={handleInputChange}
			/>
			<button type='submit'>Search</button>
		</form>
	);
}
