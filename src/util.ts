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

export function getRandomFrom<T>(array: T[]) {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
}

export function getRandomBetween(min: number, max: number) {
	const diff = max - min + 1;
	const number = Math.floor(Math.random() * diff);
	return min + number;
}
