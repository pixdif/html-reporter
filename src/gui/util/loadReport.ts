import { TestReport } from '@pixdif/model';

declare global {
	interface Window {
		testReport?: TestReport;
	}
}

export default function loadReport(): TestReport | undefined {
	const report = window.testReport;
	if (report) {
		delete window.testReport;
		return report;
	}
}
