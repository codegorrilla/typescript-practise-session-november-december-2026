import { createContext } from "react";

type GlobalType = {
	flag: string;
	setFlag: (c: string) => void;
};

type User = {
	phone: string;
	name: string;
	setPhone: (c: string) => void;
	setName: (d: string) => void;
};

export const MyGlobalContext = createContext<GlobalType>({
	flag: "Hello world",
	setFlag: (flag) => {
		console.log(flag);
	},
});

export const GlobalUserProfile = createContext<User>({
	phone: "9007696161",
	name: "Sanjib",
	setPhone: () => {},
	setName: () => {},
});
