import { createContext } from "react";

export const SelectedDateContext = createContext<{
	value: Date | undefined;
	action: (date: Date) => void;
}>({ value: undefined, action: () => {} });
export const CalendarStateContext = createContext<{
	value: boolean;
	action: (state: boolean) => void;
}>({ value: false, action: () => {} });
