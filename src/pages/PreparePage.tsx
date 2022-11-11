import { FC, useCallback, useMemo } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux";
import { Container } from "@mui/system";
import { NestedProvider } from "../components/NestedList/NestedProvider";
import { useProblemsListData } from "../hooks/useProblemsListData";
import { useNavigate, useParams } from "react-router-dom";
import { prepare } from "../redux/questionsSlice";

export const PreparePage: FC = () => {
	const { problems } = useAppSelector((state) => state.questionsSlice);

	const items = useProblemsListData(problems);

	const params = useParams();
	const selected = useMemo<string[]>(() => {
		if (!("selected" in params)) {
			return [];
		}

		return JSON.parse(params.selected as string) as string[];
	}, [params]);

	const selectedFlag = selected.length > 0;

	const navigate = useNavigate();

	const start = () => {
		navigate(`/employment/${JSON.stringify(selected)}`);
	};

	const onSelect = useCallback(
		(questions: string[]) => {
			if (questions.length) {
				navigate(`/${JSON.stringify(questions)}`, { replace: true });
			} else {
				navigate("/", { replace: true });
			}
		},
		[navigate]
	);

	return (
		<Container>
			<Card>
				<CardContent>
					<NestedProvider
						title="Выбирите разделы физики"
						items={items}
						selected={selected}
						onSelect={onSelect}
					/>
					<Box
						sx={{
							display: "flex",
							width: "100%",
							justifyContent: "flex-end",
						}}
					>
						<Button
							variant="contained"
							disabled={!selectedFlag}
							onClick={start}
						>
							Начать
						</Button>
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
};
