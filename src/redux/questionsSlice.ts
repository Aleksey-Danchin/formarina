import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getShuffled } from "../util";

export type QuestionsState = {
	problems: Array<Problem>;
	questions: Array<Question>;
};

const getInitialState = () =>
	({
		problems: require("./base.json"),
		questions: [],
	} as QuestionsState);

export const questionsSlice = createSlice({
	name: "questionsSlice",

	initialState: getInitialState(),

	reducers: {
		prepare: (state, action: PayloadAction<number[]>) => {
			state.questions = getShuffled(
				state.problems
					.filter((problem) => action.payload.includes(problem.id))
					.map(
						(problem) =>
							({
								problem,
								answer: false,
								solved: false,
								success: false,
							} as Question)
					)
			);
		},
	},
});

// Action creators are generated for each case reducer function
export const { prepare } = questionsSlice.actions;

export default questionsSlice.reducer;
