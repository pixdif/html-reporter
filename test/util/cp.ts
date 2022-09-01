import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';

async function cp(from: string, to: string): Promise<void> {
	const statFrom = fs.statSync(from);
	if (statFrom.isDirectory()) {
		const files = await fsp.readdir(from);
		await Promise.all(files.map((file) => cp(path.join(from, file), path.join(to, file))));
	} else if (statFrom.isFile()) {
		const toDir = path.dirname(to);
		if (!fs.existsSync(toDir)) {
			await fsp.mkdir(toDir, { recursive: true });
		}
		await fsp.copyFile(from, to);
	}
}

export default cp;
