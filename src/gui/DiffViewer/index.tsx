import React from 'react';

import {
	Config,
	ResponseStatus,
	TestCase,
	TestStatus,
} from '@pixdif/model';

import Client from '../../api/Client';
import { Clickable } from '../../base/Clickable';
import { makeToast } from '../../base/Toast';

import DiffLayout from '../DiffLayout';

import './styles.scss';

interface DiffViewerProps {
	config: Config;
	testCase: TestCase;
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

export default function DiffViewer({
	config,
	testCase,
}: DiffViewerProps): JSX.Element {
	const [matchedHidden, setMatchedHidden] = React.useState(true);

	const toggleMatched = (): void => {
		setMatchedHidden((prev) => !prev);
	};

	const updateBaseline = async (): Promise<void> => {
		const client = new Client(config.wsEndpoint);
		try {
			await client.connect();
			const currentDir = getCurrentDir();
			const res = await client.updateSnapshot(`${currentDir}/${testCase.expected}`, `${currentDir}/${testCase.actual}`);
			switch (res.status) {
			case ResponseStatus.Ok:
				makeToast('The snapshot has been successfully updated.');
				break;
			default:
				makeToast('Failed to write to the snapshot file.');
				break;
			}
		} catch (error) {
			makeToast('Failed to connect to the server. Please run `node server`', 'error');
		} finally {
			client.disconnect();
		}
	};

	const tolerance = config.tolerance ?? 0;
	const toleranceText = (tolerance * 100).toFixed(3);
	const { status } = testCase;

	return (
		<div className="diff-viewer">
			<h2>{testCase.actual}</h2>
			<div className="control-panel">
				<input
					type="checkbox"
					id="hide-matched"
					checked={matchedHidden}
					onChange={toggleMatched}
				/>
				<label htmlFor="hide-matched">
					Hide matched pages
					<span className="threshold">{toleranceText}</span>
				</label>
			</div>
			<h3 className="diff-layout">
				<p><a href={testCase.expected} target="_blank" rel="noreferrer">Expected</a></p>
				<p>Difference</p>
				<p><a href={testCase.actual} target="_blank" rel="noreferrer">Actual</a></p>
			</h3>
			<ul className="page-list">
				{testCase.details?.map((tp, index) => {
					if (tp.ratio <= tolerance && matchedHidden) {
						return null;
					}

					let className: string | undefined;
					if (!matchedHidden) {
						className = tp.ratio <= tolerance ? 'matched' : 'unmatched';
					}
					const key = `${matchedHidden ? 'sliced-' : 'origin-'}${index}`;
					const anchorName = `page${index}`;
					const ratioText = (tp.ratio * 100).toFixed(3);
					return (
						<li key={key} className={className}>
							<h4>
								<span id={anchorName}>{tp.name}</span>
								<em className="ratio">{ratioText}</em>
							</h4>
							<DiffLayout
								expected={tp.expected}
								actual={tp.actual}
								diff={tp.diff}
							/>
						</li>
					);
				})}
			</ul>
			{(status === TestStatus.ExpectedNotFound || status === TestStatus.Mismatched) && (
				<div className="button-area">
					<Clickable<HTMLButtonElement>
						component="button"
						onTrigger={updateBaseline}
					>
						{testCase.status === TestStatus.ExpectedNotFound ? 'Add Baseline' : 'Update Baseline'}
					</Clickable>
				</div>
			)}
		</div>
	);
}
