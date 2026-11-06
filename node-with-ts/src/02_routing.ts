import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import "dotenv/config";
import process from "node:process";

const PORT = process.env.PORT || 5001;

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		const method = req.method ?? "GET";
		const url = new URL(
			req.url ?? "/",
			`http://${req.headers.host ?? "localhost"}`,
		);
		const pathName = url.pathname;
		console.log(pathName);

		const userAgent = req.headers["user-agent"];

		res.setHeader("Content-type", "text/plain");

		if (method === "GET" && pathName === "/health") {
			res.statusCode = 200;
			res.end("Server is healthy");
			return;
		}

		if (method === "GET" && pathName === "/users") {
			res.statusCode = 200;
			res.end(`User list successfully generated, ${userAgent}`);
			return;
		}

		if (method === "POST" && pathName === "/users") {
			res.statusCode = 201;
			res.end("User created successfully");
			return;
		}

		if (method === "DELETE" && pathName === "/users") {
			res.statusCode = 200;
			res.end("User successfully deleted.");
			return;
		}

		res.statusCode = 404;
		res.end("Route not found.");
	},
);

server.listen(PORT, () => {
	console.log(`Server is now running on ${PORT}`);
});
