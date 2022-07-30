import React from 'react';
import ReactDOM from 'react-dom';

import { TestReport } from '@pixdif/model';

import ReportViewer from './gui/ReportViewer';

import './global.scss';

declare global {
	interface Window {
		testReport?: TestReport;
	}
}

if (window.testReport) {
	const report = window.testReport;
	delete window.testReport;
	ReactDOM.render(
		<ReportViewer
			report={report}
		/>,
		document.getElementById('root'),
	);
} else {
	ReactDOM.render(
		<div className="tips">
			<p>Execute node test.js &lt;file wildcard&gt; and open this page.</p>
			<p className="code">$ node test.js json\ABA\**\*.json</p>
		</div>,
		document.getElementById('root'),
	);
}
