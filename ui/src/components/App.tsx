import "../styles/index.css";
import Provider from "./Provider";
import { Router } from "./routes";
import { BrowserRouter } from "react-router-dom";

export default function App() {
	return (
		<BrowserRouter>
			<Provider>
				<Router />
			</Provider>
		</BrowserRouter>
	);
}
