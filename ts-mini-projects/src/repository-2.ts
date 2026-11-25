interface User {
	id: number;
	name: string;
	email: string;
}

class SomeClass<T> {
	public items: T[] = [];

	checkItemtype(): void {
		console.log(this.items instanceof Array);
	}
}

const newClass = new SomeClass<User>();

newClass.checkItemtype();

newClass.items.push({
	id: 2,
	name: "Sanjib",
	email: "rishaantin@gmail.com",
});

console.log(newClass);

// Pattern 1
class AnotherClass<T> extends SomeClass<T> {
	clearAll(): void {
		this.items = [];
		console.log("All items cleared");
	}
}

const userInstance = new AnotherClass<User>();
userInstance.checkItemtype();
//userInstance.items
userInstance.clearAll();

// Pattern 2
class UserClass extends SomeClass<User> {
	findByemail(email: string): User | undefined {
		return this.items.find((user) => user.email === email);
	}
}

const userRepo = new UserClass();

userRepo.items.push({
	id: 1,
	name: "Rishaan",
	email: "sanjib.id@gmail.com",
});

const foundRishaan = userRepo.findByemail("sanjib.id@gmail.com");
console.log(foundRishaan);

class LabeledClass<T> extends SomeClass<T> {
	public label: string;

	constructor(label: string) {
		super();
		this.label = label;
	}

	displayInfo(): void {
		console.log(`Label: ${this.label}`);
		this.checkItemtype();
	}
}

const specialLabel = new LabeledClass("Baishali");

specialLabel.displayInfo();
