import React from 'react';
import classNames from 'classnames';

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
				<button
					type="button"
					className="arrow"
					onClick={toggle}
					aria-label={collapsed ? 'Expand' : 'Collapse'}
				/>
				{header}
			</div>
			{children && (
				<div className="content">
					{children}
				</div>
			)}
		</div>
	);
}
