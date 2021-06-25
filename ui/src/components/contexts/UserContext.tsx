import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import { LoginCredentials, RegisterCredentials, Response } from "../../types/request";
import { User } from "../../models/User";

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
			const { code, data } = await User.authenticate();
			setLoading(false);
			if (code === 200 && data) setUser(data);
		})();
	}, []);

	async function update() {}

	async function login(credentials: LoginCredentials) {
		const { data, code, error } = await User.login(credentials);
		if (code === 200 && data) setUser(data);
		return { data, code, error };
	}

	async function register(credentials: LoginCredentials) {
		const { code, data, error } = await User.register(credentials);
		if (code === 200 && data) setUser(data);
		return { data, code, error };
	}

	async function logout() {
		setUser(null);
		const { code, error } = await User.logout();
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
