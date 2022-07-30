import React from 'react';

import TestReport from '../../../model/TestReport';
import TestStatus from '../../../model/TestStatus';

function countItem<Type>(arr: Type[], condition: (e: Type) => boolean): number {
	let num = 0;
	for (const item of arr) {
		if (condition(item)) {
			num++;
		}
	}
	return num;
}

interface ProfileAreaProps {
	report: TestReport;
}

function ProfileArea(props: ProfileAreaProps): JSX.Element {
	const { report } = props;
	const { config } = report;
	const { testCases } = report;
	const failureNum = countItem(testCases, (testCase) => testCase.status === TestStatus.Mismatched);
	const passRatio = (failureNum / testCases.length) * 100;
	const passRatioText = passRatio ? passRatio.toFixed(2) : 0;

	return (
		<div className="brief">
			<dl>
				<dt>Failure Ratio</dt>
				<dd>
					<span className="percent">{passRatioText}</span>
				</dd>
				<dd>
					<span className="progress-bar">
						<span className="current">{failureNum}</span>
						<span className="limit">{testCases.length}</span>
					</span>
				</dd>
				<dt>Difference Threshold</dt>
				<dd>
					<span className="percent">{(config.diffThreshold * 100).toFixed(1)}</span>
				</dd>
			</dl>
		</div>
	);
}

export default ProfileArea;
