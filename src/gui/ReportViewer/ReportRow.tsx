import React from 'react';

import {
	Progress,
	TestCase,
	TestStatus,
} from '@pixdif/model';

import DiffList from './DiffList';

interface StatusIconProps {
	status?: TestStatus;
	progress?: Progress;
}

function StatusIcon(props: StatusIconProps): JSX.Element | null {
	const {
		status = TestStatus.Unexecuted,
		progress,
	} = props;

	if (status === TestStatus.InProgress) {
		if (!progress) {
			return null;
		}

		return (
			<span className={`status ${status} progress-bar`}>
				<span className="current">{progress.current}</span>
				<span className="limit">{progress.limit}</span>
			</span>
		);
	}

	if (status === TestStatus.Matched) {
		return <span className="status matched">Yes</span>;
	}

	if (status === TestStatus.Mismatched) {
		return <span className="status mismatched">No</span>;
	}

	return null;
}

interface ReportRowProps {
	testCase: TestCase;
	id: number;
	tolerance: number;
	showsMatchedCases: boolean;
	showsMatchedPages: boolean;
}

export default function ReportRow(props: ReportRowProps): JSX.Element | null {
	const {
		id,
		testCase,
		tolerance,
		showsMatchedCases,
		showsMatchedPages,
	} = props;

	const {
		path,
		expected,
		actual,
		executionTime,
		diffs = [],
		status,
		comment,
	} = testCase;

	if (!showsMatchedCases && status === TestStatus.Matched) {
		return null;
	}

	const viewerUrl = `diff-viewer.html?case=${id}`;
	return (
		<tr>
			<td className="url" title={comment}>{path}</td>
			<td>
				<a href={expected} target="_blank" rel="noreferrer">View</a>
			</td>
			<td>
				<a href={actual} target="_blank" rel="noreferrer">View</a>
			</td>
			<td>
				{executionTime !== undefined && (executionTime / 1000).toFixed(3)}
			</td>
			<td>
				<StatusIcon status={status} />
			</td>
			<td className="view-all">
				{status !== TestStatus.ActualNotFound && (
					<a target="_blank" rel="noreferrer" href={viewerUrl}>View All</a>
				)}
			</td>
			<td className="difference">
				{diffs && (
					<DiffList
						diffs={diffs}
						caseId={id}
						showsMatchedPages={showsMatchedPages}
						diffThreshold={tolerance}
					/>
				)}
			</td>
		</tr>
	);
}
