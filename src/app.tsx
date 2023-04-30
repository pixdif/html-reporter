import React from 'react';
import ReactDOM from 'react-dom';

import ReportViewer from './gui/ReportViewer';
import DiffViewer from './gui/DiffViewer';
import loadReport from './loadReport';

import './global.scss';

(async function main() {
	const report = loadReport();
	if (!report) {
		ReactDOM.render(
			<div className="tips">
				<p>Failed to load test report.</p>
			</div>,
			document.getElementById('root'),
		);
		return;
	}

	const params = new URLSearchParams(window.location.search);
	const caseId = params.get('case');
	if (!caseId) {
		ReactDOM.render(
			<ReportViewer
				report={report}
			/>,
			document.getElementById('root'),
		);
		return;
	}

	const testCase = report.cases[caseId];
	if (!testCase) {
		return;
	}

	ReactDOM.render(
		<DiffViewer
			config={report.config}
			testCase={testCase}
		/>,
		document.getElementById('root'),
	);
}());
