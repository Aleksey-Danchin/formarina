/// <reference types="react-scripts" />

type ProblemBase = {
	id: number;
	path: string;
	description: string;
	solution: string;
};

type FormulaProblem = ProblemBase & { type: "formula" };
type TermProblem = ProblemBase & { type: "term" };

type Problem = FormulaProblem | TermProblem;

type QuestionBase = {
	answer: boolean;
	solved: boolean;
	success: boolean;
};

type FormulaQuestion = QuestionBase & { problem: FormulaProblem };
type TermQuestion = QuestionBase & { problem: TermProblem };

type Question = FormulaQuestion | TermQuestion;
