import Login from "./Login";
import Register from "./Register";
import { Background } from "./_styles";
import { useAuthModals } from "../../contexts/AuthModalContext";

export default function Modals() {
	const { activeModal } = useAuthModals();

	return (
		<Background active={activeModal !== null}>
			<Login />
			<Register />
		</Background>
	);
}
