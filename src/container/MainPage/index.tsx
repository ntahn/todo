import React, { createContext, useReducer, useEffect, useState } from "react";
import { Action } from "../../common/interfaces/action";
import { State } from "../../common/interfaces/state";
import { Input } from "../../components/Input";
import { todoReducer } from "./../../reducers/todoReducer";
import { Todo } from "./../../components/Todo";
import { todoConstant } from "../../common/constants/todoConstant";
import { Select } from "../../components/Select";

interface Props {}

interface Context {
	todoState: State[];
	dispatch: React.Dispatch<Action>;
}

export const mainPageContext = createContext<Context>({} as Context);

export const MainPage: React.FC<Props> = () => {
	const [todoState, dispatch] = useReducer(todoReducer, [] as State[]);
	const [display, setDisplay] = useState("all");

	useEffect(() => {
		dispatch({ type: todoConstant.SETUP_TODO, payload: null });
	}, []);

	useEffect(() => {
		localStorage.setItem("state", JSON.stringify(todoState));
	}, [todoState]);

	const renderTodos = () => {
		if (todoState && todoState.length > 0) {
			return todoState.map((item, index) => {
				return (
					<Todo
						display={display}
						key={index}
						index={index}
						todo={item.todo}
						completed={item.completed}
					/>
				);
			});
		}
	};
	return (
		<mainPageContext.Provider value={{ todoState, dispatch }}>
			<div className="m-0 min-h-screen py-10 bg-gradient-to-b sm:text-lg from-yellow-300 to-red-300 text-center px-auto">
				<h1 className=" font-extrabold text-4xl mb-6 sm:text-5xl sm:mb-8 md:mb-10">
					My todo App
				</h1>
				<Input />
				<Select setDisplay={setDisplay} />
				<div className="space-y-2 w-3/5 mx-auto">{renderTodos()}</div>
			</div>
		</mainPageContext.Provider>
	);
};
