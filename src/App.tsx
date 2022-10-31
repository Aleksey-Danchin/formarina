import { FC, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { useAppSelector } from "./redux";
import { Container } from "@mui/system";
import { NestedProvider } from "./components/NestedList/NestedProvider";
import { useProblemsListData } from "./hooks/useProblemsListData";
import { useHistoredState } from "./hooks/useHistoredState";

export const App: FC = () => {
	const { problems } = useAppSelector((state) => state.questions);

	const [selected, selectedApi] = useHistoredState<Array<string>>([]);

	const items = useProblemsListData(problems);

	useEffect(() => {
		const keydownHandler = (e: KeyboardEvent) => {
			if (e.ctrlKey) {
				if (e.code === "KeyZ") {
					selectedApi.undo();
				} else if (e.code === "KeyY") {
					selectedApi.redo();
				}
			}
		};

		document.addEventListener("keydown", keydownHandler);

		return () => document.removeEventListener("keydown", keydownHandler);
	}, [selectedApi]);

	return (
		<Container>
			<Card>
				<CardContent>
					<NestedProvider
						title="Выбирите разделы физики"
						items={items}
						selected={selected}
						onSelect={selectedApi.add}
					/>
				</CardContent>
			</Card>
		</Container>
	);
};
