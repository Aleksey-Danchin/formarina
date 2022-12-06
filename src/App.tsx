import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { PreparePage } from "./pages/PreparePage";
import { EmploymentPage } from "./pages/EmploymentPage";
import { RadiansPage } from "./pages/RadiansPage";

export const App: FC = () => {
	return (
		<Routes>
			<Route path="/radians" element={<RadiansPage />} />

			<Route path="/employment/:selected" element={<EmploymentPage />} />
			<Route path="/employment" element={<EmploymentPage />} />

			<Route path="/:selected" element={<PreparePage />} />
			<Route path="/" element={<PreparePage />} />
		</Routes>
	);
};
