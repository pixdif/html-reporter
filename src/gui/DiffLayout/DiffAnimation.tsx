import React from 'react';

import FullscreenViewer from './FullscreenViewer';
import Image from './Image';

import './DiffAnimation.scss';

interface DiffAnimationProps {
	base: string;
	diff: string;
	target: string;
}

export default function DiffAnimation(props: DiffAnimationProps): JSX.Element {
	const {
		base,
		diff,
		target,
	} = props;

	const [fullscreen, setFullscreen] = React.useState(false);

	const handleFullscreenChange = React.useCallback(() => {
		if (document.fullscreenElement) {
			setFullscreen(true);
		} else {
			setFullscreen(false);
		}
	}, []);

	return (
		<FullscreenViewer
			className="image-viewer diff-animation"
			onFullscreenChange={handleFullscreenChange}
		>
			<Image
				className="baseline"
				src={base}
				alt="Baseline"
			/>
			{fullscreen ? (
				<div className="overlay">
					<Image
						className="actual"
						src={target}
						alt="Actual"
					/>
				</div>
			) : (
				<div className="overlay gray">
					<Image
						className="diff"
						src={diff}
						alt="Difference"
					/>
				</div>
			)}
		</FullscreenViewer>
	);
}
