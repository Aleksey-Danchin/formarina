import { Typography } from "@mui/material";
import { FC } from "react";

export type QuestionSubtitleProps = {
	type?: Problem["type"];
};

export const QuestionSubtitle: FC<QuestionSubtitleProps> = ({ type }) => {
	if (type === "term") {
		return (
			<Typography
				variant="subtitle1"
				sx={{ textAlign: "center", color: "gray" }}
			>
				Дайте определение термину
			</Typography>
		);
	}

	if (type === "formula") {
		return (
			<Typography
				variant="subtitle1"
				sx={{ textAlign: "center", color: "gray" }}
			>
				Выпишите формулу
			</Typography>
		);
	}

	return null;
};
