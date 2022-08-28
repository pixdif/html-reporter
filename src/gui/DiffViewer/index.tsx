import React from 'react';

import {
	MessageLevel,
	TestReport,
	TestStatus,
} from '@pixdif/model';

import Client from '../../api/Client';
import { Clickable } from '../../base/Clickable';
import { makeToast } from '../../base/Toast';

import DiffLayout from '../DiffLayout';

import './styles.scss';

interface Message {
	message: string;
	level: MessageLevel;
}

interface DiffViewerProps {
	report: TestReport;
	caseId: number;
}

function getCurrentDir(): string {
	if (window.location.protocol !== 'file:') {
		return '.';
	}

	const baseUrl = window.location.href.substring(0, window.location.href.lastIndexOf('/'));
	const myDir = baseUrl.startsWith('file://') ? baseUrl.substring(7) : baseUrl;
	if (myDir.match(/^\/\w+:/)) {
		return myDir.substring(1);
	}
	return myDir;
}

export default function DiffViewer(props: DiffViewerProps): JSX.Element {
	const {
		report,
		caseId,
	} = props;
	const { config } = report;

	const [matchedHidden, setMatchedHidden] = React.useState(true);

	const toggleMatched = (): void => {
		setMatchedHidden((prev) => !prev);
	};

	const updateBaseline = async (): Promise<void> => {
		const data = report.testCases[caseId];
		const client = new Client(config.wsEndpoint);
		try {
			await client.connect();
			const currentDir = getCurrentDir();
			const res = await client.updateSnapshot(`${currentDir}/${data.expected}`, `${currentDir}/${data.actual}`) as Message;
			makeToast(res.message, res.level);
		} catch (error) {
			makeToast('Failed to connect to the server. Please run `node server`', 'error');
		} finally {
			client.disconnect();
		}
	};

	const threshold = config.diffThreshold || 0;
	const data = report.testCases[caseId];
	const diffs = (data.diffs || []).map((ratio, i) => ({ index: i + 1, ratio }));

	const imageDir = `image/${data.path.replace(/\.[^/\\.]+$/, '')}`;
	const thresholdText = (threshold * 100).toFixed(3);

	return (
		<div className="diff-viewer">
			<h2>{data.actual}</h2>
			<div className="control-panel">
				<input
					type="checkbox"
					id="hide-matched"
					checked={matchedHidden}
					onChange={toggleMatched}
				/>
				<label htmlFor="hide-matched">
					Hide matched pages
					<span className="threshold">{thresholdText}</span>
				</label>
			</div>
			<h3 className="diff-layout">
				<p><a href={data.expected} target="_blank" rel="noreferrer">Baseline</a></p>
				<p>Difference</p>
				<p><a href={data.actual} target="_blank" rel="noreferrer">Output</a></p>
			</h3>
			<ul className="page-list">
				{diffs.map(({ index, ratio }) => {
					if (ratio <= threshold && matchedHidden) {
						return null;
					}

					let className: string;
					if (!matchedHidden) {
						className = ratio <= threshold ? 'matched' : 'unmatched';
					}
					const key = `${matchedHidden ? 'sliced-' : 'origin-'}${index}`;
					const anchorName = `page${index}`;
					const title = `Page ${index}`;
					const ratioText = (ratio * 100).toFixed(3);
					return (
						<li key={key} className={className}>
							<h4>
								<span id={anchorName}>{title}</span>
								<em className="ratio">{ratioText}</em>
							</h4>
							<DiffLayout
								path={imageDir}
								pageIndex={index}
							/>
						</li>
					);
				})}
			</ul>
			{(data.status === TestStatus.ExpectedNotFound || data.status === TestStatus.Mismatched) && (
				<div className="button-area">
					<Clickable<HTMLButtonElement>
						component="button"
						onTrigger={updateBaseline}
					>
						{data.status === TestStatus.ExpectedNotFound ? 'Add Baseline' : 'Update Baseline'}
					</Clickable>
				</div>
			)}
		</div>
	);
}
