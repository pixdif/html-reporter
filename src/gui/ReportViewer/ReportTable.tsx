import React from 'react';

import {
	TestReport,
	TestStatus,
} from '@pixdif/model';

import ReportRow from './ReportRow';

import './ReportTable.scss';

interface ReportTableProps {
	report: TestReport;
}

export default function ReportTable(props: ReportTableProps): JSX.Element {
	const { report } = props;
	const {
		config,
		testCases,
	} = report;

	const allMatched = testCases.length > 0 && testCases.every(
		(tc) => tc.status === TestStatus.Matched,
	);
	const [showsMatchedCases, setShowsMatchedCases] = React.useState(allMatched);
	const [showsMatchedPages, setShowsMatchedPages] = React.useState(false);

	function toggleMatchedCases(): void {
		setShowsMatchedCases((prev) => !prev);
	}

	function toggleMatchedPages(): void {
		setShowsMatchedPages((prev) => !prev);
	}

	return (
		<table className="test-report">
			<thead>
				<tr>
					<td>
						Test Case
						<div className="float-options">
							<input
								type="checkbox"
								id="show-matched-cases"
								name="show-matched-cases"
								checked={showsMatchedCases}
								onChange={toggleMatchedCases}
							/>
							<label htmlFor="show-matched-cases">Shows matched cases</label>
						</div>
					</td>
					<td>Expected</td>
					<td>Actual</td>
					<td>Time (s)</td>
					<td>Matched</td>
					<td>Images</td>
					<td>
						Difference
						<div className="float-options">
							<input
								type="checkbox"
								id="show-matched-pages"
								name="show-matched-pages"
								checked={showsMatchedPages}
								onChange={toggleMatchedPages}
							/>
							<label htmlFor="show-matched-pages">Shows matched pages</label>
						</div>
					</td>
				</tr>
			</thead>
			<tbody>
				{testCases.map((testCase, id) => (
					<ReportRow
						key={`row-${testCase.path}`}
						id={id}
						tolerance={config.tolerance}
						showsMatchedCases={showsMatchedCases}
						showsMatchedPages={showsMatchedPages}
						testCase={testCase}
					/>
				))}
			</tbody>
		</table>
	);
}
