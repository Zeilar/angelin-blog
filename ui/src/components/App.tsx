import Provider from "./Provider";
import Router from "./Router";
import "../styles/index.css";
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
