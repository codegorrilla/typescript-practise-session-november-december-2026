import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Globalstate, GlobalUserProvider } from "./provider/Provider.tsx";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Globalstate>
			<GlobalUserProvider>
				<App />
			</GlobalUserProvider>
		</Globalstate>
	</StrictMode>,
);
