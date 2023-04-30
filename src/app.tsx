import React from 'react';
import { createRoot } from 'react-dom/client';

import ReportViewer from './gui/ReportViewer';
import DiffViewer from './gui/DiffViewer';
import loadReport from './loadReport';

import './global.scss';

(async function main() {
	const root = document.getElementById('root');
	if (!root) {
		return;
	}

	const app = createRoot(root);
	const report = loadReport();
	if (!report) {
		app.render(
			<div className="tips">
				<p>Failed to load test report.</p>
			</div>,
		);
		return;
	}

	const params = new URLSearchParams(window.location.search);
	const caseId = params.get('case');
	if (!caseId) {
		app.render(
			<ReportViewer
				report={report}
			/>,
		);
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
