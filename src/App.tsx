import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import { PreparePage } from "./pages/PreparePage";
import { EmploymentPage } from "./pages/EmploymentPage";

export const App: FC = () => {
	return (
		<Routes>
			<Route path="/" element={<PreparePage />} />
			<Route path="/employment" element={<EmploymentPage />} />
		</Routes>
	);
};
