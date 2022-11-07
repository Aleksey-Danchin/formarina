import { Container, Card, CardContent, Typography } from "@mui/material";
import { FC } from "react";
import { useAppSelector } from "../redux";

export const EmploymentPage: FC = () => {
	const { questions } = useAppSelector((state) => state.questionsSlice);

	console.log(questions);

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography>Employment page</Typography>
				</CardContent>
			</Card>
		</Container>
	);
};
