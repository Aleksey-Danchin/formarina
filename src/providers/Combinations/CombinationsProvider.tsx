import { FC, ReactNode, useEffect, useState } from "react";
import { Context, KeyboardState } from "./Context";

type CombinationsProviderProps = {
	children?: ReactNode | ReactNode[];
};

export const CombinationsProvider: FC<CombinationsProviderProps> = ({
	children,
}) => {
	const [state, setState] = useState<KeyboardState>({
		sticked: false,
		event: {} as KeyboardEvent,
		codes: [] as string[],
	});

	useEffect(() => {
		const keydownHandler = (event: KeyboardEvent) => {
			setState(({ codes }) => {
				const includes = codes.includes(event.code);

				return {
					event,
					sticked: includes,
					codes: includes ? codes : [...codes, event.code],
				};
			});
		};

		const keyupHandler = (e: KeyboardEvent) => {
			setState(({ codes }) => {
				const index = codes.indexOf(e.code);

				if (index !== -1) {
					codes = [...codes];
					codes.splice(index, 1);
				}

				return {
					sticked: false,
					event: e,
					codes,
				};
			});
		};

		const blurHandler = () =>
			setState({
				sticked: false,
				event: {} as KeyboardEvent,
				codes: [] as string[],
			});

		document.addEventListener("keydown", keydownHandler);
		document.addEventListener("keyup", keyupHandler);
		window.addEventListener("blur", blurHandler);

		return () => {
			document.removeEventListener("keydown", keydownHandler);
			document.removeEventListener("keyup", keyupHandler);
			window.removeEventListener("blur", blurHandler);
		};
	}, []);

	return <Context.Provider value={state}>{children}</Context.Provider>;
};
