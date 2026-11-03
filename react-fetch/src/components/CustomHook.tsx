import type React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// 1. Strict union type for Storage keys
type StorageKey = "username" | "userId" | "mailId";

export const CustomHook = (): React.JSX.Element => {
	const [name, setName] = useLocalStorage("username" satisfies StorageKey, "");
	const [id, setId] = useLocalStorage("userId" satisfies StorageKey, "");
	const [mail, setMail] = useLocalStorage("mailId" satisfies StorageKey, "");

	// 2. type event handler factory
	const handleInputChange =
		(setter: (val: string) => void) =>
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			setter(e.target.value);
		};

	return (
		<>
			<input
				type='text'
				placeholder='enter your name'
				value={name}
				onChange={handleInputChange(setName)}
			/>
			<h2>Hello {name}</h2>
			<input
				type='text'
				placeholder='enter your id'
				value={id}
				onChange={handleInputChange(setId)}
			/>
			<h2>Your Id: {id}</h2>
			<hr />
			<input
				type='text'
				placeholder='enter mail id'
				value={mail}
				onChange={handleInputChange(setMail)}
			/>
			<h2>Your Mailid: {mail}</h2>
		</>
	);
};
