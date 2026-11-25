interface User {
	id: number;
	name: string;
	email: string;
}

type UserKeys = keyof User; // id, name, email

function getProperty<T, K extends keyof T>(obj: T, key: K) {
	return obj[key];
}

const student = { id: 101, name: "Rishaan", email: "rishantin@gmail.com" };

getProperty(student, "name");
getProperty(student, "email");
// getProperty(student, "age");
