import React from 'react';
import classNames from 'classnames';

interface ImageProps {
	className?: string;
	src: string;
	alt: string;
}

export default function Image(props: ImageProps): JSX.Element {
	const {
		className,
		src,
		alt,
	} = props;
	const [loading, setLoading] = React.useState(true);
	const [error, setError] = React.useState(false);

	const handleLoad = () => {
		setLoading(false);
	};

	const handleError = () => {
		setError(true);
	};

	return (
		<img
			className={classNames(className, { loading, error })}
			src={src}
			alt={alt}
			onLoad={handleLoad}
			onError={handleError}
		/>
	);
}
