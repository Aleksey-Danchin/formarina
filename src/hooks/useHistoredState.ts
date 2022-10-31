import { useCallback, useState } from "react";

export const useHistoredState = <T>(
	initState: T
): [T, { undo: () => void; redo: () => void; add: (item: T) => void }] => {
	const [history, setHistory] = useState<Array<T>>([initState]);
	const [index, setIndex] = useState(0);

	const undo = useCallback(() => setIndex((x) => Math.max(0, x - 1)), []);

	const redo = useCallback(
		() => setIndex((x) => Math.min(x + 1, history.length - 1)),
		[history.length]
	);

	const add = useCallback(
		(item: T) => {
			const nextItems = history.slice();
			nextItems.splice(index + 1);
			nextItems.push(item);

			setHistory(nextItems);
			setIndex(nextItems.length - 1);
		},
		[history, index]
	);

	return [history[index], { undo, redo, add }];
};
