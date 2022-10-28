import { FC, useCallback, useMemo, useState } from "react";
import { Button, Divider, List, ListSubheader } from "@mui/material";
import { Box } from "@mui/system";
import { ListItemType } from "./ListItemType";

type FormulasSelectProps = {
	formulas: Array<FormulaProblem>;
	onStart: (formulas: Array<FormulaProblem>) => void;
};

export const FormulasSelect: FC<FormulasSelectProps> = ({
	formulas,
	onStart,
}) => {
	const [tableOfFormulas, setTableOfFormulas] = useState(() => {
		const tableOfFormulas = {} as {
			[key: string]: Array<{
				name: string;
				selected: boolean;
			}>;
		};

		const types = formulas.map((item) => item.type);

		for (const type of types) {
			const subtypes = Array.from(
				new Set(
					formulas
						.filter((item) => item.type === type)
						.map((item) => item.subtype)
				)
			);

			tableOfFormulas[type] = subtypes.map((subtype) => ({
				name: subtype,
				selected: false,
			}));
		}

		return tableOfFormulas;
	});

	const onSelect = useCallback(
		({
			type,
			subtype,
			selected,
		}: {
			type: string;
			subtype?: string;
			selected: boolean;
		}) => {
			setTableOfFormulas((table) => {
				if (subtype) {
					const index = table[type].findIndex(
						(item) => item.name === subtype
					);

					table[type][index] = {
						...table[type][index],
						selected,
					};

					table[type] = [...table[type]];

					return { ...table };
				}

				return {
					...table,
					[type]: table[type].map(({ name }) => ({
						name,
						selected,
					})),
				};
			});
		},
		[]
	);

	const startHandler = useCallback(() => {
		const selectedFormulas = [] as Array<FormulaProblem>;
		for (const key of Object.keys(tableOfFormulas)) {
			for (const { name, selected } of tableOfFormulas[key]) {
				if (selected) {
					for (const item of formulas) {
						if (item.type === key && item.subtype === name) {
							selectedFormulas.push(item);
						}
					}
				}
			}
		}
		onStart(selectedFormulas);
	}, [formulas, onStart, tableOfFormulas]);

	const someSelected = useMemo(() => {
		for (const key of Object.keys(tableOfFormulas)) {
			for (const { selected } of tableOfFormulas[key]) {
				if (selected) {
					return true;
				}
			}
		}

		return false;
	}, [tableOfFormulas]);

	return (
		<Box>
			<List
				subheader={
					<ListSubheader component="div" id="nested-list-subheader">
						Выбирите разделы физики:
					</ListSubheader>
				}
			>
				{Object.keys(tableOfFormulas).map((type, index) => {
					return (
						<ListItemType
							key={type}
							title={type}
							subtypes={tableOfFormulas[type]}
							onSelect={onSelect}
						/>
					);
				})}
			</List>

			<Divider variant="middle" />

			<Box sx={{ m: 2, display: "flex", justifyContent: "flex-end" }}>
				<Button
					variant="contained"
					onClick={startHandler}
					disabled={!someSelected}
				>
					Начать
				</Button>
			</Box>
		</Box>
	);
};
