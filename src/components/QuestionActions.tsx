import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export type QuestionActionsProps = {
	answer: boolean;
	solved: boolean;
	success: boolean;

	onAnswer: () => void;
	onSolve: (flag: boolean) => void;
};

export const QuestionActions: FC<QuestionActionsProps> = ({
	answer,
	solved,
	success,

	onAnswer,
	onSolve,
}) => {
	if (!answer) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
				}}
			>
				<Button variant="contained" onClick={onAnswer}>
					Готово
				</Button>
			</Box>
		);
	}

	if (!solved) {
		return (
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					gap: 2,
					mt: 5,
				}}
			>
				<Button
					color="error"
					variant="contained"
					onClick={() => onSolve(false)}
				>
					Не верно
				</Button>
				<Button
					color="success"
					variant="contained"
					onClick={() => onSolve(true)}
				>
					Верно
				</Button>
			</Box>
		);
	}

	if (success) {
		return (
			<Box sx={{ mx: "auto", mt: 5 }}>
				<IconButton onClick={() => onSolve(false)}>
					<ThumbUpIcon color="success" sx={{ fontSize: 40 }} />
				</IconButton>
			</Box>
		);
	}

	return (
		<Box sx={{ mx: "auto", mt: 5 }}>
			<IconButton onClick={() => onSolve(true)}>
				<ThumbDownIcon color="error" sx={{ fontSize: 40 }} />
			</IconButton>
		</Box>
	);
};
