import { FC, useState } from "react";
import { Card, CardContent } from "@mui/material";
import { useAppSelector } from "./redux";
import { Container } from "@mui/system";
import { FormulasSelect } from "./components/FormulasSelect";

export const App: FC = () => {
	const { formulas } = useAppSelector((state) => state.formulas);
	const [selectedFormulas, setSelectedFormulas] = useState<
		Array<FormulaProblem>
	>([]);

	console.log(selectedFormulas);

	return (
		<Container>
			<Card>
				<CardContent>
					<FormulasSelect
						formulas={formulas}
						onStart={setSelectedFormulas}
					/>
				</CardContent>
			</Card>
		</Container>
	);
};
