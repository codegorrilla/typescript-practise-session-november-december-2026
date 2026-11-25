// type Preferences = Record<"likes" | "dislikes" | "neutral", number>;

// function displayLikes(numbers: Preferences): void {
// 	console.log(`Number of likes: ${numbers.likes}`);
// }

// displayLikes({ likes: 7, dislikes: 10, neutral: 12 });

type NetworkUser = {
	id: string;
	first_name: string;
	email_address: string;
};

type CleanUser = {
	id: string;
	name: string;
	email: string;
};

// generic api client with multiple generics
class ApiClient<T, R = T> {
	constructor(private baseUrl: string) {} // http://localhost:3000

	async fetch(endpoint: string, transformer?: (data: T) => R): Promise<R> {
		try {
			const res = await fetch(`${this.baseUrl}${endpoint}`);
			const data: T = await res.json();
			if (transformer) {
				return transformer(data);
			}
			return data as unknown as R;
		} catch (error) {
			throw new Error(`API request to ${endpoint} failed: ${error}`);
		}
	}
}

async function simpleApi() {
	const simpleClient = new ApiClient<NetworkUser>("https://api.com");
	const simpleData = await simpleClient.fetch("/user/1");
	console.log(simpleData);

	const userClient = new ApiClient<NetworkUser, CleanUser>("https://api.com");

	const cleanData = await userClient.fetch("/profile/1", (networkData) => {
		return {
			id: networkData.id,
			name: networkData.first_name,
			email: networkData.email_address,
		};
	});

	console.log(cleanData.email);
}

simpleApi();
