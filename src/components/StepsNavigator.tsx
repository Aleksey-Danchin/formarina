import { Box } from "@mui/material";
import { FC } from "react";
import { StepNavigator } from "./StepNavigator";

export type StepsNavigatorProps = {
	question?: Question;
	questions: Question[];
	onSelect: (stepNumber: number) => void;
};

export const StepsNavigator: FC<StepsNavigatorProps> = ({
	question,
	questions,
	onSelect,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				flexWrap: "wrap",
				justifyContent: "space-between",
			}}
		>
			{questions.map((item, index) => (
				<StepNavigator
					isCurrent={question === item}
					question={item}
					key={item.problem.id}
					onSelect={() => onSelect(index)}
				/>
			))}
		</Box>
	);
};
