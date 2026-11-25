interface User {
	id: number;
	name: string;
	email: string;
}

interface Product {
	id: number;
	title: string;
	price: number;
}

interface IRepository<T> {
	getAll(): T[];
	getById(id: number): T | undefined;
	add(item: T): void;
	delete(id: number): void;
}

class MemoryRepository<T extends { id: number }> implements IRepository<T> {
	private items: T[] = [];
	getAll(): T[] {
		return this.items;
	}

	getById(id: number): T | undefined {
		return this.items.find((item) => item.id === id);
	}

	add(item: T): void {
		this.items.push(item);
		console.log(`Saved item with ID: ${item.id}`);
	}

	delete(id: number): void {
		this.items = this.items.filter((item) => item.id !== id);
		console.log(`Deleted item with ID: ${id}`);
	}
}

const userRepository = new MemoryRepository<User>();
userRepository.add({ id: 1, name: "Rishaan", email: "rismon_key@gmail.com" });
const allUsers = userRepository.getAll();
console.log("All users", allUsers);

const productRepository = new MemoryRepository<Product>();
productRepository.add({ id: 2, title: "Mechanical Keyboard", price: 2999 });

const product = productRepository.getById(2);

if (product) {
	console.log("Found product: ", product?.title);
}
