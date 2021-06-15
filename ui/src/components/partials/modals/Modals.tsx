import { Register, Login } from "./";
import { Background } from "./_styles";
import { useAuthModals } from "../../contexts";

export default function Modals() {
	const { activeModal } = useAuthModals();

	return (
		<Background active={activeModal !== null}>
			<Login />
			<Register />
		</Background>
	);
}
