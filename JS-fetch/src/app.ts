console.log("Typescript configured");

type Post = {
	id: number;
	title: String;
	body: String;
};

type CurrencyRates = {
	date: string;
	base: string;
	quote: string;
	rate: number;
};

//Fetch API
const postList = async () => {
	try {
		const response = await fetch("https://jsonplaceholder.typicode.com/posts");

		if (!response.ok) {
			throw new Error("Not received response");
		}

		const posts: Post[] = await response.json();
		console.log(posts);
		console.log(posts instanceof Array ? posts[0]?.title : undefined);

		//generating list
		const list = document.createElement("ul");
		list.className = "list";

		const listIItems = posts.map((post) => {
			const listItem = document.createElement("li");

			listItem.innerHTML = `<p>${post.id}</p><p>${post.title}</p><p>${post.body}</p>`;

			return listItem;
		});

		list.append(...listIItems);
		document.body.appendChild(list);
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error: ", err.message);
		} else {
			console.error("Error: ", err);
		}
	}
};

const currRates = async () => {
	try {
		const res = await fetch("https://api.frankfurter.dev/v2/rates");

		if (!res.ok) {
			throw new Error("Error fetching currency rates");
		}
		const rates: CurrencyRates[] = await res.json();
		//console.log(rates);

		const firstRate = rates[0];

		if (firstRate !== undefined) {
			console.log(Object.values(firstRate));
		}
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error: ", err.message);
		} else {
			console.error("Error: ", err);
		}
	}
};

document.addEventListener("DOMContentLoaded", currRates);
