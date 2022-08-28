import React from 'react';

import ImageViewer from './ImageViewer';
import DiffAnimation from './DiffAnimation';

import './index.scss';

interface DiffLayoutProps {
	path: string;
	pageIndex: number;
}

export default function DiffLayout(props: DiffLayoutProps): JSX.Element {
	const {
		path,
		pageIndex,
	} = props;

	const expected = `${path}/expected/${pageIndex}.png`;
	const diff = `${path}/${pageIndex}.png`;
	const actual = `${path}/actual/${pageIndex}.png`;

	return (
		<div className="diff-layout">
			<ImageViewer
				src={expected}
				alt="Expected Image"
			/>
			<DiffAnimation
				base={expected}
				diff={diff}
				target={actual}
			/>
			<ImageViewer
				src={actual}
				alt="Actual Image"
			/>
		</div>
	);
}
