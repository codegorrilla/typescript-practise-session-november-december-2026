type ApiUser = {
	readonly id: number;
	name?: string;
	bio?: string;
};

type EditableUser<T> = {
	-readonly [K in keyof T]-?: T[K];
};

type Userform = EditableUser<ApiUser>;

const sanjib: Userform = {
	id: 100,
	name: "Sanjib",
	bio: "React Developer",
};

console.log(sanjib.bio);

sanjib.id = 200;

console.log(sanjib.id);
