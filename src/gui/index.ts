import type { TestReport } from '@pixdif/model';

import ReportViewer from './page/ReportViewer';
import DiffFlow from './page/DiffFlow';
import DiffViewer from './page/DiffViewer';
import loadReport from './util/loadReport';

import './theme/global.scss';

function renderReport(report: TestReport): HTMLElement | undefined {
	const params = new URLSearchParams(window.location.search);
	const caseId = params.get('case');
	if (!caseId) {
		const mode = params.get('mode') ?? 'table';
		if (mode === 'table') {
			const viewer = new ReportViewer();
			viewer.report = report;
			return viewer;
		}

		const flow = new DiffFlow();
		flow.report = report;
		return flow;
	}

	const testCase = report.cases[caseId];
	if (testCase) {
		const viewer = new DiffViewer();
		viewer.config = report.config;
		viewer.testCase = testCase;
		return viewer;
	}
}

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

	const viewer = renderReport(report);
	if (viewer) {
		document.body.appendChild(viewer);
	}
}());
