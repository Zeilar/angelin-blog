import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "../../types/models";
import { UserCredentials } from "../../types/request";
import UserHelpers from "../../utils/User";

interface Props {
	children: ReactNode;
}

interface Context {
	user: User | null;
	handleLogin: (user: UserCredentials) => Promise<boolean | object[]>;
}

export const UserContext = createContext<Context | null>(null);

export function UserContextProvider({ children }: Props) {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		(async () => {
			const { code, data } = await UserHelpers.authenticate<User>();
			if (code === 200) return setUser(data);
			setUser(null);
		})();
	}, []);

	async function handleLogin(user: UserCredentials) {
		const { code, data } = await UserHelpers.login<User>(user);

		if (code === 200) {
			setUser(data);
			return true;
		}

		const errors: object[] = [];
		// validation
		return errors;
	}

	const values: Context = {
		user,
		handleLogin,
	};

	return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
