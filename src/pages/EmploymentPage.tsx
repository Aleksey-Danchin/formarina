import { Container, Card, CardContent, Box, Button } from "@mui/material";
import { FC, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionProps, Question } from "../components/Question";
import { StepsNavigator } from "../components/StepsNavigator";
import { useAppDispatch, useAppSelector } from "../redux";
import { answer, solve } from "../redux/questionsSlice";

export const EmploymentPage: FC = () => {
	const { questions } = useAppSelector((state) => state.questionsSlice);
	const [number, setNumber] = useState(0);

	const dispatch = useAppDispatch();
	const naviagte = useNavigate();

	const isSolved = questions.every((question) => question.solved);

	const onAnswer: QuestionProps["onAnswer"] = (problemId) =>
		dispatch(answer(problemId));

	const onSolve: QuestionProps["onSolve"] = (id, flag) => {
		const question = questions[number];

		if (question && !question.solved) {
			setNumber((x) => Math.min(x + 1, questions.length - 1));
		}

		dispatch(solve({ id, flag }));
	};

	useEffect(() => {
		if (!questions.length) {
			naviagte("/", { replace: true });
		}
	}, [naviagte, questions.length]);

	if (!questions.length) {
		return null;
	}

	return (
		<Container>
			<Card>
				<CardContent>
					<Box
						sx={{
							maxWidth: `${questions.length * 15}px`,
							my: 5,
							mx: "auto",
						}}
					>
						<StepsNavigator
							question={questions[number]}
							questions={questions}
							onSelect={(stepNumber) => setNumber(stepNumber)}
						/>
					</Box>
					<Question
						{...questions[number]}
						onAnswer={onAnswer}
						onSolve={onSolve}
					/>

					{isSolved && (
						<Box
							sx={{
								mt: 5,
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
							}}
						>
							<Button
								variant="contained"
								onClick={() => naviagte("/")}
							>
								Вернуться к выбору тем
							</Button>
						</Box>
					)}
				</CardContent>
			</Card>
		</Container>
	);
};
