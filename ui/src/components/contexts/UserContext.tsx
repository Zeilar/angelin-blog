import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { User } from "../../types/models";
import { LoginCredentials, RegisterCredentials, Response } from "../../types/request";
import { UserHelpers } from "../../utils";

interface Props {
	children: ReactNode;
}

interface Context {
	user: User | null;
	loggedIn: boolean;
	login: (credentials: LoginCredentials) => Promise<Response<User>>;
	register: (credentials: RegisterCredentials) => Promise<Response<User>>;
	logout: () => Promise<Response<User>>;
	loading: boolean;
}

interface UserEditable {
	email?: string;
	password?: string;
}

export const UserContext = createContext<Context | null>(null);

export function UserContextProvider({ children }: Props) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const { code, data } = await UserHelpers.authenticate<User>();
			setLoading(false);
			if (code === 200 && data) return setUser(data);
			setUser(null);
		})();
	}, []);

	async function update() {}

	async function login(credentials: LoginCredentials) {
		const { data, code, error } = await UserHelpers.login<User>(credentials);
		if (code === 200 && data) setUser(data);
		return { data, code, error };
	}

	async function register(credentials: LoginCredentials) {
		const { code, data, error } = await UserHelpers.register<User>(credentials);
		if (code === 200 && data) setUser(data);
		return { data, code, error };
	}

	async function logout() {
		const { code, error } = await UserHelpers.logout();
		setUser(null);
		return { code, error };
	}

	const values: Context = {
		loggedIn: Boolean(user),
		user,
		login,
		logout,
		register,
		loading,
	};

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(UserContext);
	if (!context) throw new Error();
	return context;
};
