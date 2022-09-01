import React from 'react';
import ReactDOM from 'react-dom';

import DiffViewer from './gui/DiffViewer';
import loadReport from './loadReport';

import './global.scss';

(async function main(): Promise<void> {
	const params = new URLSearchParams(window.location.search);
	const caseStr = params.get('case');
	if (!caseStr) {
		ReactDOM.render(
			<div>Please open test-viewer.html</div>,
			document.getElementById('root'),
		);
		return;
	}

	const report = loadReport();
	if (report) {
		const caseId = Number.parseInt(caseStr, 10);
		ReactDOM.render(
			<DiffViewer
				report={report}
				caseId={caseId}
			/>,
			document.getElementById('root'),
		);
	}
}());
