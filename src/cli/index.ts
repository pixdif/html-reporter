import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import url from 'url';
import {
	TestStatus,
	TestReport,
	TestReportWriter,
} from '@pixdif/model';

const rootDir = path.dirname(url.fileURLToPath(import.meta.url));

async function cp(from: string, to: string): Promise<void> {
	const statFrom = fs.statSync(from);
	if (statFrom.isDirectory()) {
		const files = await fsp.readdir(from);
		await Promise.all(
			files.map((file) => cp(
				path.join(from, file),
				path.join(to, file),
			)),
		);
	} else if (statFrom.isFile()) {
		const toDir = path.dirname(to);
		if (!fs.existsSync(toDir)) {
			await fsp.mkdir(toDir, { recursive: true });
		}
		await fsp.copyFile(from, to);
	}
}

const writeReport: TestReportWriter = async (
	reportData: TestReport,
	outputDir: string,
): Promise<void> => {
	const distDir = rootDir;
	if (!fs.existsSync(outputDir)) {
		await fsp.mkdir(outputDir, { recursive: true });
	}

	await fsp.writeFile(path.join(outputDir, 'test-report.data.js'), `window.testReport = ${JSON.stringify(reportData)};`);

	await fsp.copyFile(path.join(distDir, 'index.html'), path.join(outputDir, 'index.html'));

	const outputStaticDir = path.join(outputDir, 'static');
	const reporterStaticDir = path.join(distDir, 'static');
	await cp(reporterStaticDir, outputStaticDir);

	const failedCases = Object.values(reportData.cases)
		.filter((res) => res.status === TestStatus.Mismatched)
		.map((res) => res.path);
	if (failedCases.length > 0) {
		await fsp.writeFile(path.join(outputDir, 'failed-cases.json'), JSON.stringify(failedCases));
	}
};

export default writeReport;
