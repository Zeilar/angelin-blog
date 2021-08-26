import { createContext, useState, ReactNode } from "react";
import { ActiveModal } from "../../types/modals";
import { useHistory } from "react-router";
import { useEffect } from "react";
import { useContext } from "react";

interface Props {
	children: ReactNode;
}

export interface IAuthModalContext {
	activeModal: ActiveModal;
	closeModals(): void;
	mountError: string | null;
}

export const AuthModalContext = createContext<IAuthModalContext>({} as IAuthModalContext);

export function useAuthModalContext() {
	return useContext(AuthModalContext);
}

export function AuthModalContextProvider({ children }: Props) {
	const [activeModal, setActiveModal] = useState<ActiveModal>(null);
	const [mountError, setMountError] = useState<string | null>(null);
	const { push } = useHistory();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const error = params.get("error");
		if (error) {
			push("/");
			setMountError(error);
			setActiveModal("login");
		}
	}, [push]);

	function closeModals() {
		setActiveModal(null);
	}

	const values: IAuthModalContext = {
		activeModal,
		closeModals,
		mountError,
	};

	return <AuthModalContext.Provider value={values}>{children}</AuthModalContext.Provider>;
}
