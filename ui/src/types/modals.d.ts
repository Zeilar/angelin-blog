export interface RedirectState {
	loginPrompt?: boolean;
	url?: string;
}

export type ActiveModal = "login" | "register" | null;

export type Status = "loading" | "success" | "error" | "done" | null;
