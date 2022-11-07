import { Box } from "@mui/material";
import { FC } from "react";

export type StepNavigatorProps = {
	isCurrent: boolean;
	question: Question;
	onSelect: () => void;
};

export const StepNavigator: FC<StepNavigatorProps> = ({
	isCurrent,
	question,
	onSelect,
}) => {
	const { solved, success } = question;

	if (!solved) {
		return (
			<Box
				onClick={onSelect}
				title={question.problem.description}
				sx={{
					width: 10,
					height: 10,
					border: "1px solid black",
					backgroundColor: "white",
					borderRadius: isCurrent ? 0 : 10,
					cursor: "pointer",
					":hover": {
						backgroundColor: "black",
					},
				}}
			/>
		);
	}

	if (success) {
		return (
			<Box
				onClick={onSelect}
				title={question.problem.description}
				sx={{
					width: 10,
					height: 10,
					border: "1px solid green",
					backgroundColor: "green",
					borderRadius: isCurrent ? 0 : 10,
					cursor: "pointer",
					":hover": {
						backgroundColor: "white",
					},
				}}
			/>
		);
	}

	return (
		<Box
			onClick={onSelect}
			title={question.problem.description}
			sx={{
				width: 10,
				height: 10,
				border: "1px solid red",
				backgroundColor: "red",
				borderRadius: isCurrent ? 0 : 10,
				cursor: "pointer",
				":hover": {
					backgroundColor: "white",
				},
			}}
		/>
	);
};
