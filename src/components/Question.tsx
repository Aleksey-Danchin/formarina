import { Box } from "@mui/material";
import { FC } from "react";
import { QuestionActions } from "./QuestionActions";
import { QuestionSolution } from "./QuestionSolution";
import { QuestionSubtitle } from "./QuestionSubtitle";
import { QuestionTitle } from "./QuestionTitle";

export type QuestionProps = {
	problem: Problem;
	answer: boolean;
	solved: boolean;
	success: boolean;
	onAnswer: (problemId: number) => void;
	onSolve: (id: number, flag: boolean) => void;
};

export const Question: FC<QuestionProps> = ({
	problem,
	answer,
	solved,
	success,
	onAnswer,
	onSolve,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignContent: "center",
			}}
		>
			<QuestionTitle>{problem.description}</QuestionTitle>

			<QuestionSubtitle type={problem.type} />

			{answer && <QuestionSolution problem={problem} />}

			<QuestionActions
				answer={answer}
				solved={solved}
				success={success}
				onAnswer={() => onAnswer(problem.id)}
				onSolve={(flag) => onSolve(problem.id, flag)}
			/>
		</Box>
	);
};
