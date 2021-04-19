import React, { createContext, useReducer } from "react";
import { Action } from "../common/interfaces/action";
import { State } from "../common/interfaces/state";
import { todoReducer } from "./../reducers/todoReducer";

interface Context {
	todoState: State[];
	dispatch: React.Dispatch<Action>;
}

export const context = createContext<Context>({} as Context);

interface Props {}

export const Provider: React.FC<Props> = ({ children }) => {
	const [todoState, dispatch] = useReducer(todoReducer, [] as State[]);

	return (
		<context.Provider value={{ todoState, dispatch }}>
			{children}
		</context.Provider>
	);
};
