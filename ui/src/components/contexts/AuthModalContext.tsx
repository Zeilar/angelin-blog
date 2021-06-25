import { useEffect } from "react";
import { createContext, useState, ReactNode, useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { useAuth } from "./UserContext";

interface Props {
	children: ReactNode;
}

export type ActiveModal = "login" | "register" | null;

interface Context {
	activeModal: ActiveModal;
	openModal: (modal: ActiveModal) => void;
	closeModals: () => void;
}

interface State {
	loginPrompt?: boolean;
	url?: string;
}

export const AuthModalContext = createContext<Context | null>(null);

export function AuthModalContextProvider({ children }: Props) {
	const { state } = useLocation<State>();
	const { push } = useHistory();
	const [activeModal, setActiveModal] = useState<ActiveModal>(
		state?.loginPrompt ? "login" : null
	);
	const { loggedIn } = useAuth();

	useEffect(() => {
		// Reset the state so if browser reloads the page, the login does not prompt again
		if (state?.loginPrompt) {
			push("", {});
		}
	}, [state?.loginPrompt, push]);

	useEffect(() => {
		return () => {};
	}, [activeModal]);

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
