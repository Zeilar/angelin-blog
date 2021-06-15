import { createContext, useState, ReactNode, useContext } from "react";

interface Props {
	children: ReactNode;
}

export type ActiveModal = "login" | "register" | null;

interface Context {
	activeModal: ActiveModal;
	openModal: (modal: ActiveModal) => void;
	closeModals: () => void;
}

export const AuthModalContext = createContext<Context | null>(null);

export function AuthModalContextProvider({ children }: Props) {
	const [activeModal, setActiveModal] = useState<ActiveModal>(null);

	function openModal(modal: ActiveModal) {
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