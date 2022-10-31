import { useContext, useEffect, useMemo } from "react";
import { Context } from "./Context";

export const useCombinationKeys = (
	combination: string,
	callback: (e: KeyboardEvent) => any,
	options?: { sticky?: boolean }
) => {
	const { codes, sticked, event } = useContext(Context);

	const buttons = useMemo(
		() =>
			combination
				.trim()
				.replace("/s/g", "+")
				.replace(/\+{1,}/g, "+")
				.split("+"),
		[combination]
	);

	useEffect(() => {}, []);
};
