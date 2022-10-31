import { useMemo } from "react";
import { ListData } from "../components/NestedList/Context";

export const useProblemsListData = (problems: Array<Problem>) => {
	return useMemo(() => {
		const items: ListData = [];

		const ids = new Set();

		for (const problem of problems) {
			if (ids.has(problem.path)) {
				continue;
			}

			const steps = problem.path.split("/");
			let path = "";

			for (const step of steps) {
				const id = path ? `${path}/${step}` : step;

				if (!ids.has(id)) {
					ids.add(id);

					if (path) {
						items.push({ id, label: step, parent: path });
					} else {
						items.push({ id, label: step });
					}
				}

				path = id;
			}
		}

		for (const problem of problems) {
			items.push({
				id: problem.id.toString(),
				label: problem.description,
				parent: problem.path,
			});
		}

		return items;
	}, [problems]);
};
