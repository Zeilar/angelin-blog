import Provider from "./Provider";
import Router from "./Router";

export default function App(): JSX.Element {
	return (
		<Provider>
			<Router />
		</Provider>
	);
}
