import "dotenv/config";
import process, { abort } from "node:process";

// web scrapping
const API =
	process.env.API_URL || "http://jsonplaceholder.typicode.com/users/1";

type Placeholder = {
	id: number;
	name: string;
	email: string;
	company: {
		name: string;
	};
};

type PublicUser = {
	id: number;
	name: string;
	email: string;
	company: string;
};

function transformUser(rawData: Placeholder): PublicUser {
	return {
		id: rawData.id,
		name: rawData.name,
		email: rawData.email,
		company: rawData.company.name,
	};
}

async function fetchExternalUser(): Promise<void> {
	const controller = new AbortController();

	const timeOut = setTimeout(() => {
		controller.abort();
	}, 5000);

	try {
		const response = await fetch(API, {
			method: "GET",
			signal: controller.signal,
		});

		if (!response.ok) {
			console.error(`UpStream API failed with http ${response.status}`);
			return;
		}

		const rawUser = (await response.json()) as Placeholder;
		const user = transformUser(rawUser);

		console.log(user);
	} catch (error) {
		if (error instanceof Error && error.name === "AbortError") {
			console.error(
				"Request failed because upstream API took long to response.",
			);
			return;
		}

		const message = error instanceof Error ? error.message : "unkonown error";
		console.error("External API failed", message);
	} finally {
		clearTimeout(timeOut);
	}
}

fetchExternalUser();
