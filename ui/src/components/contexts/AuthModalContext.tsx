import { createContext, useState, ReactNode, useContext } from "react";
import { useAuth } from "./UserContext";
import { ActiveModal } from "../../types/modals";

interface Props {
	children: ReactNode;
}

interface Context {
	activeModal: ActiveModal;
	openModal: (modal: ActiveModal) => void;
	closeModals: () => void;
}

export const AuthModalContext = createContext<Context | null>(null);

export function AuthModalContextProvider({ children }: Props) {
	const [activeModal, setActiveModal] = useState<ActiveModal>(null);
	const { loggedIn } = useAuth();

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
	};

	return <AuthModalContext.Provider value={values}>{children}</AuthModalContext.Provider>;
}

export const useAuthModals = () => {
	const context = useContext(AuthModalContext);
	if (!context) throw new Error();
	return context;
};
