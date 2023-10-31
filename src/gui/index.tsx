import React from 'react';
import { createRoot } from 'react-dom/client';

import ReportViewer from './page/ReportViewer';
import DiffViewer from './page/DiffViewer';
import loadReport from './util/loadReport';

import './theme/global.scss';

(async function main() {
	const root = document.getElementById('root');
	if (!root) {
		return;
	}

	const app = createRoot(root);
	const report = loadReport();
	if (!report) {
		app.render(
			<div role="status" className="tips">
				<p>Failed to load test report.</p>
			</div>,
		);
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
	if (!testCase) {
		return;
	}

	app.render(
		<DiffViewer
			config={report.config}
			testCase={testCase}
		/>,
	);
}());
