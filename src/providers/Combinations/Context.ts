import { createContext } from "react";

export type KeyboardState = {
	sticked: boolean;
	event: KeyboardEvent;
	codes: string[];
};

export const Context = createContext<KeyboardState>({
	sticked: false,
	event: {} as KeyboardEvent,
	codes: [],
});
