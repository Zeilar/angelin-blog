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
			const query = await User.authenticate();
			setLoading(false);
			if (query.ok && query.data) {
				setUser(query.data);
			}
		})();
	}, []);

	async function update() {}

	async function login(credentials: LoginCredentials) {
		const query = await User.login(credentials);
		if (query.ok && query.data) setUser(query.data);
		return query;
	}

	async function register(credentials: LoginCredentials) {
		const query = await User.register(credentials);
		if (query.ok && query.data) setUser(query.data);
		return query;
	}

	async function logout() {
		setUser(null);
		return await User.logout();
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
