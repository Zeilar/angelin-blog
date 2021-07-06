import { createContext, useState, ReactNode, useContext } from "react";
import { useAuth } from "./UserContext";
import { ActiveModal } from "../../types/modals";
import { useHistory } from "react-router";
import { useEffect } from "react";

interface Props {
	children: ReactNode;
}

interface Context {
	activeModal: ActiveModal;
	openModal: (modal: ActiveModal) => void;
	closeModals: () => void;
	mountError: string | null;
}

export const AuthModalContext = createContext<Context | null>(null);

export function AuthModalContextProvider({ children }: Props) {
	const [activeModal, setActiveModal] = useState<ActiveModal>(null);
	const [mountError, setMountError] = useState<string | null>(null);
	const { loggedIn } = useAuth();
	const { push } = useHistory();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const error = params.get("error");
		if (error) {
			push("/");
			setMountError(error);
			setActiveModal("login");
		}
	}, []);

	function openModal(modal: ActiveModal) {
		if (loggedIn) return;
		setActiveModal(modal);
	}

	function closeModals() {
		setActiveModal(null);
	}

	const values: Context = {
		activeModal,
		openModal,
		closeModals,
		mountError,
	};

	return <AuthModalContext.Provider value={values}>{children}</AuthModalContext.Provider>;
}

export const useAuthModals = () => {
	const context = useContext(AuthModalContext);
	if (!context) throw new Error();
	return context;
};
