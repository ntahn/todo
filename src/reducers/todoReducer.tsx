import { Action } from "../common/interfaces/action";
import { State } from "../common/interfaces/state";
import { todoConstant } from "../common/constants/todoConstant";

export const todoReducer = (state: State[], action: Action): State[] => {
	switch (action.type) {
		case todoConstant.ADD_TODO:
			if (typeof action.payload === "string") {
				return [...state, { todo: action.payload, completed: false }];
			}
			return [...state];
		case todoConstant.REMOVE_TODO: {
			const arr = [...state];
			if (typeof action.payload === "number") {
				arr.splice(action.payload, 1);
			}
			return arr;
		}
		case todoConstant.TOGGLE_TODO: {
			const arr = [...state];
			if (typeof action.payload === "number") {
				// const hold = arr.splice(action.payload, 1);
				// arr.splice(action.payload, 0, {
				// 	...hold[0],
				// 	completed: !hold[0].completed,
				// });
				const array = arr.map((item, index) => {
					if (index === action.payload) {
						return { todo: item.todo, completed: !item.completed };
					}
					return item;
				});
				return array;
				// arr[action.payload].completed = !arr[action.payload].completed;
			}
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
