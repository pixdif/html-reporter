import React from 'react';
import ReactDOM from 'react-dom';

import { TestReport } from '@pixdif/model';

import DiffViewer from './gui/DiffViewer';

import './global.scss';

declare global {
	interface Window {
		testReport?: TestReport;
	}
}

(async function main(): Promise<void> {
	const params = new URLSearchParams(window.location.search);
	const caseStr = params.get('case');
	if (!caseStr) {
		ReactDOM.render(
			<div>Please open test-viewer.html</div>,
			document.getElementById('root'),
		);
	} else if (window.testReport) {
		const report = window.testReport;
		delete window.testReport;

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
