import { ReactNode } from "react";
import { createContext, useState, useEffect } from "react";

interface Props {
	children: ReactNode;
}

interface IPopupContext {}

export const PopupContext = createContext({} as IPopupContext);

export function PopupContextProvider({ children }: Props) {
	const values = {};

	return <PopupContext.Provider value={values}>{children}</PopupContext.Provider>;
}
