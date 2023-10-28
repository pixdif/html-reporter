import React from 'react';
import classNames from 'classnames';

import FullscreenViewer from './FullscreenViewer';
import Image from './Image';

import './ImageViewer.scss';

interface ImageViewerProps {
	src: string;
	alt: string;
}

export default function ImageViewer(props: ImageViewerProps): JSX.Element {
	const {
		src,
		alt,
	} = props;

	return (
		<FullscreenViewer className={classNames('image-viewer')}>
			<Image
				src={src}
				alt={alt}
			/>
		</FullscreenViewer>
	);
}
