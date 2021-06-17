import { Register, Login } from "./";
import { Background } from "./_styles";
import { useAuthModals } from "../../contexts";
import classnames from "classnames";

export type ModalStatus = "error" | "loading" | "success" | "done" | null;

export default function Modals() {
	const { activeModal } = useAuthModals();

	return (
		<Background className={classnames({ active: activeModal != null })}>
			<Login />
			<Register />
		</Background>
	);
}
