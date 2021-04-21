import { Action } from "../common/interfaces/action";
import { State } from "../common/interfaces/state";
import { todoConstant } from "../common/constants/todoConstant";
import { v4 as uuidv4 } from "uuid";

export const todoReducer = (state: State[], action: Action): State[] => {
	switch (action.type) {
		case todoConstant.ADD_TODO:
			if (typeof action.payload === "string") {
				return [
					...state,
					{ todo: action.payload, completed: false, id: uuidv4() },
				];
			}
			return [...state];
		case todoConstant.REMOVE_TODO: {
			return [...state].filter((item) => item.id !== action.payload);
		}
		case todoConstant.TOGGLE_TODO: {
			const arr = [...state].map((item) => {
				if (item.id === action.payload) {
					return { ...item, completed: !item.completed };
				}
				return item;
			});
			return arr;
		}
		case todoConstant.SETUP_TODO: {
			const arr = JSON.parse(localStorage.getItem("state") || "{}");
			return [...arr];
		}
		default:
			return [...state];
	}
};
