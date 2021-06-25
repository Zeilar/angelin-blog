export interface RedirectState {
	loginPrompt?: boolean;
	url?: string;
}

export type ActiveModal = "login" | "register" | null;
