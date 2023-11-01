import ReportViewer from './page/ReportViewer';
import DiffViewer from './page/DiffViewer';
import loadReport from './util/loadReport';

import './theme/global.scss';

(async function main() {
	const root = document.getElementById('root');
	if (!root) {
		return;
	}

	const report = loadReport();
	if (!report) {
		const status = document.createElement('div');
		status.role = 'status';
		status.className = 'tips';
		status.textContent = 'Failed to load test report.';
		root.appendChild(status);
		return;
	}

	if (report.title) {
		document.title = report.title;
	}

	const params = new URLSearchParams(window.location.search);
	const caseId = params.get('case');
	if (!caseId) {
		const viewer = new ReportViewer();
		viewer.report = report;
		root.appendChild(viewer);
		return;
	}

	const testCase = report.cases[caseId];
	if (testCase) {
		const viewer = new DiffViewer();
		viewer.config = report.config;
		viewer.testCase = testCase;
		root.appendChild(viewer);
	}
}());
