import { useState, type ReactNode } from "react";
import { GlobalUserProfile, MyGlobalContext } from "../context/Context";

export const Globalstate = ({ children }: { children: ReactNode }) => {
	const [flag, setFlag] = useState("Hello world");

	return (
		<MyGlobalContext.Provider value={{ flag, setFlag }}>
			{children}
		</MyGlobalContext.Provider>
	);
};

export const GlobalUserProvider = ({ children }: { children: ReactNode }) => {
	const [name, setName] = useState("Sanjib");
	const [phone, setPhone] = useState("9007696161");

	const profileContextValue = { phone, name, setPhone, setName };

	return (
		<GlobalUserProfile.Provider value={profileContextValue}>
			{children}
		</GlobalUserProfile.Provider>
	);
};
