import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import {
	TestStatus,
	TestReport,
} from '@pixdif/model';

async function writeReport(reportData: TestReport, outputDir: string): Promise<void> {
	const distDir = __dirname;
	if (!fs.existsSync(outputDir)) {
		await fsp.mkdir(outputDir, { recursive: true });
	}

	await fsp.writeFile(path.join(outputDir, 'test-report.data.js'), `window.testReport = ${JSON.stringify(reportData)};`);

	await fsp.copyFile(path.join(distDir, 'index.html'), path.join(outputDir, 'index.html'));
	await fsp.copyFile(path.join(distDir, 'diff-viewer.html'), path.join(outputDir, 'diff-viewer.html'));

	const outputStaticDir = path.join(outputDir, 'static');
	if (!fs.existsSync(outputStaticDir)) {
		await fsp.mkdir(outputStaticDir);
	}
	const reporterStaticDir = path.join(distDir, 'static');
	const staticFiles = await fsp.readdir(reporterStaticDir);
	for (const staticFile of staticFiles) {
		await fsp.copyFile(
			path.join(reporterStaticDir, staticFile),
			path.join(outputStaticDir, staticFile),
		);
	}

	const failedCases = reportData.testCases
		.filter((res) => res.status === TestStatus.Mismatched)
		.map((res) => res.path);
	if (failedCases.length > 0) {
		await fsp.writeFile(path.join(outputDir, 'failed-cases.json'), JSON.stringify(failedCases));
	}
}

export default writeReport;
