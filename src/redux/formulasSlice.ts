import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type FormulasState = {
	formulas: Array<FormulaProblem>;
};

const initialState: FormulasState = {
	formulas: require("./formulas.json"),
};

export const formulasSlice = createSlice({
	name: "formulas",
	initialState,
	reducers: {
		incrementByAmount: (state, action: PayloadAction<number>) => {},
	},
});

// Action creators are generated for each case reducer function
export const { incrementByAmount } = formulasSlice.actions;

export default formulasSlice.reducer;
