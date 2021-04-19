import React, { useContext, useEffect, useState } from "react";
import { Input } from "../../components/Input";
import { Todo } from "./../../components/Todo";
import { todoConstant } from "../../common/constants/todoConstant";
import { Select } from "../../components/Select";
import { context } from "../../provider/Provider";

interface Props {}

export const MainPage: React.FC<Props> = () => {
	const [display, setDisplay] = useState("all");
	const { todoState, dispatch } = useContext(context);

	useEffect(() => {
		dispatch({ type: todoConstant.SETUP_TODO, payload: null });
	}, [dispatch]);

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
		<div className="m-0 min-h-screen py-10 bg-gradient-to-b sm:text-lg from-yellow-300 to-red-300 text-center px-auto">
			<h1 className=" font-extrabold text-4xl mb-6 sm:text-5xl sm:mb-8 md:mb-10">
				My todo App
			</h1>
			<Input />
			<Select setDisplay={setDisplay} />
			<div className="space-y-2 w-3/5 mx-auto">{renderTodos()}</div>
		</div>
	);
};
