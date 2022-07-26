import React from 'react';

import Clickable from '../../base/Clickable';

interface FullscreenViewerProps {
	className?: string;
	children?: React.ReactNode;
	onFullscreenChange?: (e: Event) => void;
}

export default function FullscreenViewer(props: FullscreenViewerProps): JSX.Element {
	const {
		className,
		children,
		onFullscreenChange,
	} = props;

	const viewer = React.useRef<HTMLDivElement>(null);

	const toggleFullscreen = React.useCallback(() => {
		const me = viewer.current;
		if (!me) {
			return;
		}

		if (document.fullscreenElement !== me) {
			me.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	}, []);

	React.useEffect(() => {
		const me = viewer.current;
		if (!onFullscreenChange || !me) {
			return;
		}

		me.addEventListener('fullscreenchange', onFullscreenChange);
		return () => {
			me.removeEventListener('fullscreenchange', onFullscreenChange);
		};
	}, [viewer]);

	return (
		<Clickable
			className={className}
			ref={viewer}
			onTrigger={toggleFullscreen}
		>
			{children}
		</Clickable>
	);
}
