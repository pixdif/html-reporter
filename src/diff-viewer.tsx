import React from 'react';
import ReactDOM from 'react-dom';

import DiffViewer from './gui/DiffViewer';
import loadReport from './loadReport';

import './global.scss';

(async function main(): Promise<void> {
	const params = new URLSearchParams(window.location.search);
	const caseId = params.get('case');
	if (!caseId) {
		ReactDOM.render(
			<div>Please open test-viewer.html</div>,
			document.getElementById('root'),
		);
		return;
	}

	const report = loadReport();
	if (!report) {
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
