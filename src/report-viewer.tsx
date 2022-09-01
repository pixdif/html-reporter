import React from 'react';
import ReactDOM from 'react-dom';

import ReportViewer from './gui/ReportViewer';
import loadReport from './loadReport';

import './global.scss';

(async function main() {
	const report = loadReport();
	if (report) {
		ReactDOM.render(
			<ReportViewer
				report={report}
			/>,
			document.getElementById('root'),
		);
	} else {
		ReactDOM.render(
			<div className="tips">
				<p>Failed to load test report.</p>
			</div>,
			document.getElementById('root'),
		);
	}
}());
