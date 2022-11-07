import {
	Container,
	Card,
	CardContent,
	Typography,
	Button,
	IconButton,
} from "@mui/material";
import { Box } from "@mui/system";
import { FC, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux";
import { answer, solve } from "../redux/questionsSlice";

import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";

export const EmploymentPage: FC = () => {
	const { questions } = useAppSelector((state) => state.questionsSlice);
	const [number, setNumber] = useState(0);
	const dispatch = useDispatch();
	const naviagte = useNavigate();

	const onAnswer: QuestionProps["onAnswer"] = (problemId) =>
		dispatch(answer(problemId));

	const onSolve: QuestionProps["onSolve"] = (id, flag) => {
		dispatch(solve({ id, flag }));
		setNumber((x) => x + 1);
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

export type QuestionProps = {
	problem: Problem;
	answer: boolean;
	solved: boolean;
	success: boolean;
	onAnswer: (problemId: number) => void;
	onSolve: (id: number, flag: boolean) => void;
};

export const Question: FC<QuestionProps> = ({
	problem,
	answer,
	solved,
	success,
	onAnswer,
	onSolve,
}) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignContent: "center",
			}}
		>
			<QuestionTitle>{problem.description}</QuestionTitle>

			<QuestionSubtitle type={problem.type} />

			{answer && <QuestionSolution problem={problem} />}

			<QuestionActions
				answer={answer}
				solved={solved}
				success={success}
				onAnswer={() => onAnswer(problem.id)}
				onSolve={(flag) => onSolve(problem.id, flag)}
			/>
		</Box>
	);
};

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
