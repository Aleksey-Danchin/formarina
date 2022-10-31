(async () => {
	console.time("Done");

	const path = require("path");
	const fs = require("fs/promises");

	const basePath = path.resolve(__dirname, "base.json");
	const baseStat = await fs.stat(basePath);

	if (!baseStat.isFile()) {
		throw Error("base.json not found");
	}

	const reservePath = path.resolve(__dirname, "__reserve.json");

	try {
		await fs.unlink(reservePath);
	} catch (err) {}

	const base = require(basePath);

	await fs.writeFile(reservePath, JSON.stringify(base, null, "\t"), "utf-8");
	await fs.unlink(basePath);

	const baseWithId = base.map(({ id, ...item }, index) => ({
		id: index + 1,
		...item,
	}));

	await fs.writeFile(
		basePath,
		JSON.stringify(baseWithId, null, "\t"),
		"utf-8"
	);

	await fs.unlink(reservePath);

	console.timeEnd("Done");
})();
