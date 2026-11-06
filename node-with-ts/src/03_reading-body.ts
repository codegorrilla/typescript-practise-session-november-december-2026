import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import "dotenv/config";
import process from "node:process";

const PORT = process.env.PORT || 5001;

type CreateUserBody = {
	name?: string;
	email?: string;
};

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		const method = req.method ?? "GET";
		const url = new URL(
			req.url ?? "/",
			`http://${req.headers.host ?? "localhost"}`,
		);
		const pathName = url.pathname;

		res.setHeader("Content-type", "text/plain");

		if (method === "POST" && pathName === "/users") {
			const chunks: Buffer[] = [];

			req.on("data", (chunk: Buffer) => {
				chunks.push(chunk);
			});

			console.log(chunks);

			req.on("end", () => {
				try {
					const rawBody = Buffer.concat(chunks).toString("utf-8");

					if (!rawBody) {
						res.statusCode = 400;
						res.end("Request body is required.");
						return;
					}

					const body = JSON.parse(rawBody) as CreateUserBody;
					console.log(body);

					//edge cases
					if (!body.name || !body.email) {
						res.statusCode = 400;
						res.end("Both name and email is required.");
						return;
					}

					res.statusCode = 201;
					res.end(`User created as ${body.name} and ${body.email}`);
				} catch (error) {
					res.statusCode = 400;
					res.end("Invalid JSON body");
					console.error("Not able to accept the request", error);
				}
			}); // this will only run when the node receives the full request body

			req.on("error", () => {
				res.statusCode = 500;
				res.end("Failed to read request body.");
			});

			return;
		}

		res.statusCode = 404;
		res.end("Route not found.");
	},
);

server.listen(PORT, () => {
	console.log(`Server is now running on ${PORT}`);
});
