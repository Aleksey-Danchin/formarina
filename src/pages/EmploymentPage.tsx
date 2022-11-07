import { Container, Card, CardContent, Box } from "@mui/material";
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

	const onAnswer: QuestionProps["onAnswer"] = (problemId) =>
		dispatch(answer(problemId));

	const onSolve: QuestionProps["onSolve"] = (id, flag) => {
		dispatch(solve({ id, flag }));

		const question = questions.find(
			(question) => question.problem.id === id
		);

		if (question && !question.solved) {
			setNumber((x) => Math.min(x + 1, questions.length - 1));
		}
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
				</CardContent>
			</Card>
		</Container>
	);
};
