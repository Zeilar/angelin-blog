import { createContext, useState, useEffect, ReactNode } from "react";
import { LoginCredentials, RegisterCredentials, Response } from "../../types/request";
import { User } from "../../models/User";
import { useContext } from "react";

interface Props {
	children: ReactNode;
}

export interface IUserContext {
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

export const UserContext = createContext<IUserContext>({} as IUserContext);

export function useUserContext() {
	return useContext(UserContext);
}

export function UserContextProvider({ children }: Props) {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const query = await User.authenticate();
			if (query.ok && query.data) {
				setUser(query.data);
			}
			setLoading(false);
		})();
	}, []);

	async function update() {}

	async function login(credentials: LoginCredentials) {
		const query = await User.login(credentials);
		if (query.ok && query.data) {
			setUser(query.data);
		}
		return query;
	}

	async function register(credentials: LoginCredentials) {
		const query = await User.register(credentials);
		if (query.ok && query.data) {
			setUser(query.data);
		}
		return query;
	}

	async function logout() {
		setUser(null);
		return User.logout();
	}

	const values: IUserContext = {
		loggedIn: user instanceof User,
		user,
		login,
		logout,
		register,
		loading,
	};

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
