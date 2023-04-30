import React from 'react';
import classNames from 'classnames';

import { Clickable } from '../../base/Clickable';

import './index.scss';

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
	header: React.ReactNode;
	defaultCollapsed?: boolean;
}

export default function Collapse({
	className,
	header,
	children,
	defaultCollapsed,
	...otherProps
}: CollapseProps): JSX.Element {
	const [collapsed, setCollapsed] = React.useState(defaultCollapsed ?? true);

	const toggle = React.useCallback(() => {
		setCollapsed((prev) => !prev);
	}, [setCollapsed]);

	return (
		<div className={classNames('collapse', [className], { collapsed })} {...otherProps}>
			<div className="header">
				<Clickable
					className="arrow"
					onTrigger={toggle}
				/>
				{header}
			</div>
			<div className="content">
				{children}
			</div>
		</div>
	);
}
