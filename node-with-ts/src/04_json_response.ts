import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import "dotenv/config";
import process from "node:process";

const PORT = process.env.PORT || 5001;

type User = {
	id: number;
	name: string;
	email: string;
};

type ApiResponse<T> = {
	success: boolean;
	message: string;
	data?: T;
	error?: string;
};

const users: User[] = [
	{ id: 1, name: "Sanjib", email: "code.gorrilla@gmail.com" },
	{ id: 2, name: "Rishaan", email: "rishaan.gorrilla@gmail.com" },
];

function sendJson<T>(
	res: ServerResponse,
	statusCode: number,
	body: ApiResponse<T>,
): void {
	res.statusCode = statusCode;
	res.setHeader("Content-type", "application/json");
	res.end(JSON.stringify(body));
}

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		const method = req.method;
		const requestUrl = new URL(
			req.url ?? "/",
			`http://${req.headers.host ?? "localhost"}`,
		);
		const pathName = requestUrl.pathname;

		if (method === "GET" && pathName === "/") {
			sendJson(res, 200, {
				success: true,
				message: "server is running",
				data: {
					routes: ["GET/users"],
				},
			});

			return;
		}

		if (method === "GET" && pathName === "/users") {
			sendJson(res, 200, {
				success: true,
				message: "users fetched successfully",
				data: users,
			});

			return;
		}

		sendJson<null>(res, 404, {
			success: false,
			message: "Route not found",
			error: `${method} ${pathName} does not exist.`,
		});
	},
);

server.listen(PORT, () => {
	console.log(`Server is now running on ${PORT}`);
});
