import React from 'react';
import { TestReport } from '@pixdif/model';

import ProfileArea from './ProfileArea';
import ReportTable from './ReportTable';

import './index.scss';

interface TestViewerProps {
	report: TestReport;
}

function TestViewer(props: TestViewerProps): JSX.Element {
	const { report } = props;
	return (
		<div className="test-viewer">
			<ProfileArea report={report} />
			<ReportTable report={report} />
		</div>
	);
}

export default TestViewer;
