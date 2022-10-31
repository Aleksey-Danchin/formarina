export function getShuffled<T>(items: Array<T>): Array<T> {
	items = items.slice();
	const result = [] as Array<T>;

	while (items.length) {
		const index = Math.floor(Math.random() * items.length);
		const item = items.splice(index, 1)[0];
		result.push(item);
	}

	return result;
}
