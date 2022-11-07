import { Typography } from "@mui/material";
import { FC } from "react";

export type QuestionTitleProps = {
	children?: string;
};

export const QuestionTitle: FC<QuestionTitleProps> = ({ children }) => {
	return (
		<Typography variant="h4" sx={{ textAlign: "center" }}>
			{children}
		</Typography>
	);
};
