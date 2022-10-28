/// <reference types="react-scripts" />

type FormulaProblem = {
	id: string;
	type: string;
	subtype: string;
	task: string;
	solution: string;
};

type FormulaQuestion = {
	problem: FormulaProblem;
	answer: boolean;
	solved: boolean;
	success: boolean;
};
