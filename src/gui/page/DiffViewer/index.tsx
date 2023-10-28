import React from 'react';

import {
	Config,
	TestCase,
	TestStatus,
} from '@pixdif/model';

import { makeToast } from '../../common/Toast';

import DiffLayout from './DiffLayout';

import './styles.scss';

interface DiffViewerProps {
	config: Config;
	testCase: TestCase;
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
		const payload = {
			expected: testCase.expected,
			actual: testCase.actual,
		};
		try {
			const res = await window.fetch('/api/snapshots', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			switch (res.status) {
			case 200:
				makeToast('The snapshot has been successfully updated.');
				break;
			default:
				makeToast('Failed to write to the snapshot file.');
				break;
			}
		} catch (error) {
			makeToast('Failed to connect to the server. Please run `pixdif serve`', 'error');
		}
	};

	React.useEffect(() => {
		document.title = `${testCase.name} - ${document.title}`;
	}, []);

	const tolerance = config.tolerance ?? 0;
	const toleranceText = (tolerance * 100).toFixed(3);
	const { status } = testCase;

	return (
		<div className="diff-viewer">
			<h2>{testCase.path ? (<a href={testCase.path}>{testCase.name}</a>) : testCase.name}</h2>
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
			{window.location.protocol !== 'file:'
			&& (status === TestStatus.ExpectedNotFound || status === TestStatus.Mismatched)
			&& (
				<div className="button-area">
					<button
						type="button"
						onClick={updateBaseline}
					>
						{testCase.status === TestStatus.ExpectedNotFound ? 'Add Baseline' : 'Update Baseline'}
					</button>
				</div>
			)}
		</div>
	);
}
