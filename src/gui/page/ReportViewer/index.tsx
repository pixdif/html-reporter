import React from 'react';
import { TestReport } from '@pixdif/model';

import ProfileArea from './ProfileArea';
import ReportTable from './ReportTable';

import './index.scss';

interface ReportViewerProps {
	report: TestReport;
}

function ReportViewer(props: ReportViewerProps): JSX.Element {
	const { report } = props;
	return (
		<div className="report-viewer">
			<ProfileArea report={report} />
			<ReportTable report={report} />
		</div>
	);
}

export default ReportViewer;
