import {
	Container,
	Card,
	CardContent,
	Box,
	Button,
	Typography,
} from "@mui/material";
import { FC, useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { QuestionProps, Question } from "../components/Question";
import { StepsNavigator } from "../components/StepsNavigator";
import { useAppDispatch, useAppSelector } from "../redux";
import { answer, prepare, solve } from "../redux/questionsSlice";

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

	const params = useParams();
	const selected = useMemo<string[]>(() => {
		if (!("selected" in params)) {
			return [];
		}

		return JSON.parse(params.selected as string) as string[];
	}, [params]);

	useEffect(() => {
		dispatch(prepare(selected.map(Number)));
	}, [dispatch, selected]);

	console.log("fired");

	if (!questions.length) {
		return (
			<Container>
				<Card>
					<CardContent sx={{ my: 3 }}>
						<Typography variant="h3" sx={{ textAlign: "center" }}>
							Нет вопросов.
						</Typography>
						<Typography sx={{ textAlign: "center" }}>
							<Link to="/">Выбирите темы</Link> для тренировке.
						</Typography>
					</CardContent>
				</Card>
			</Container>
		);
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
								onClick={() =>
									naviagte(`/${JSON.stringify(selected)}`)
								}
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
