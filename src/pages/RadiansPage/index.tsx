import { Box, Card } from "@mui/material";
import { Container } from "@mui/system";
import { FC, useState } from "react";
import { getRandomBetween, getRandomFrom } from "../../util";
import Circle from "./Circle.png";

const angels = [
	["0", "2\\pi", "-2\\pi"],
	["\\frac{\\pi}{6}", "\\frac{13\\pi}{6}", "-\\frac{11\\pi}{6}"],
	["\\frac{\\pi}{4}"],
	["\\frac{\\pi}{3}"],
	["\\frac{\\pi}{2}"],
	["\\frac{2\\pi}{3}"],
	["\\frac{3\\pi}{4}"],
	["\\frac{5\\pi}{6}"],
	["\\pi", "-\\pi"],
	["\\frac{7\\pi}{6}"],
	["\\frac{5\\pi}{4}"],
	["\\frac{4\\pi}{3}"],
	["\\frac{3\\pi}{4}"],
	["\\frac{5\\pi}{3}"],
	["\\frac{7\\pi}{4}"],
	["\\frac{11\\pi}{6}", "-\\frac{\\pi}{6}"],
];

export const RadiansPage: FC = () => {
	const [pointIndex, setPointIndex] = useState(() => getRandomBetween(0, 15));
	const [answer, setAnswer] = useState<null | number>(null);

	return (
		<Container>
			<Card>
				<Box sx={{ display: "flex", flexDirection: "row" }}>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							flexDirection: "row",
							justifyContent: "center",
						}}
					>
						<img
							src={
								"https://latex.codecogs.com/gif.latex?" +
								encodeURI(
									"\\dpi{300} " +
										getRandomFrom(angels[pointIndex])
								)
							}
							alt=""
						/>
					</Box>
					<Box sx={{ flexGrow: 1 }}>
						<img src={Circle} style={{ width: "250px" }} />
					</Box>
				</Box>
			</Card>
		</Container>
	);
};
