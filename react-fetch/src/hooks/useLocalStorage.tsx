import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
	const [name, setName] = useState<string>(() => {
		const saved = localStorage.getItem(key);
		return saved !== null ? saved : initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, name);
	}, [key, name]);

	return [name, setName] as const;
};
