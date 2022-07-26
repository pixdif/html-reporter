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

	const base = `${path}/base/${pageIndex}.png`;
	const diff = `${path}/${pageIndex}.png`;
	const target = `${path}/target/${pageIndex}.png`;

	return (
		<div className="diff-layout">
			<ImageViewer
				src={base}
				alt="Baseline"
			/>
			<DiffAnimation
				base={base}
				diff={diff}
				target={target}
			/>
			<ImageViewer
				src={target}
				alt="Target"
			/>
		</div>
	);
}
