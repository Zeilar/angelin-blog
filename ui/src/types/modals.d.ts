export interface RedirectState {
	loginPrompt?: boolean;
	url?: string;
}

export type ActiveModal = "login" | "register" | null;

export type ModalStatus = "loading" | "success" | "error" | "done" | null;
