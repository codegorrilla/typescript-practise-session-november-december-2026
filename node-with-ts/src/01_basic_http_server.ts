import http from "node:http";
import type { IncomingMessage, ServerResponse } from "node:http";
import "dotenv/config";
import process from "node:process";

const PORT = process.env.PORT || 5001;

const server = http.createServer(
	(req: IncomingMessage, res: ServerResponse) => {
		const method = req.method;
		const url = req.url;
		const userAgent = req.headers["user-agent"];

		res.statusCode = 200;
		res.setHeader("Content-type", "text/plain");
		res.end(`Basic http node server ${method}: ${url}: ${userAgent}`);
	},
);

server.listen(PORT, () => {
	console.log(`Server is now running on ${PORT}`);
});
