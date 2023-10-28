import React from 'react';

import ImageViewer from './ImageViewer';
import DiffAnimation from './DiffAnimation';

import './index.scss';

interface DiffLayoutProps {
	expected: string;
	actual: string;
	diff?: string;
}

export default function DiffLayout({
	expected,
	actual,
	diff,
}: DiffLayoutProps): JSX.Element {
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
