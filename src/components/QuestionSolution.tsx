import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

export type QuestionSolutionProps = {
	problem: Problem;
};

export const QuestionSolution: FC<QuestionSolutionProps> = ({ problem }) => {
	if (problem.type === "formula") {
		return (
			<Box sx={{ mt: 5, mx: "auto" }}>
				<img
					src={
						"https://latex.codecogs.com/gif.latex?" +
						encodeURI("\\dpi{300} " + problem.solution)
					}
					alt={problem.solution}
				/>
			</Box>
		);
	}

	if (problem.type === "term") {
		return (
			<Box sx={{ mt: 5 }}>
				<Typography sx={{ textAlign: "center" }}>
					{problem.solution}
				</Typography>
			</Box>
		);
	}

	return null;
};
