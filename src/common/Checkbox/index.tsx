import React from 'react';

import { Clickable } from '../../base/Clickable';

import './index.scss';

export type CheckboxState = boolean | 'mixed';

export interface CheckboxChangeEvent {
	name?: string;
	checked: boolean;
}

interface CheckboxProps {
	name?: string;
	defaultChecked?: CheckboxState;
	children?: React.ReactNode;
	onChange?(e: CheckboxChangeEvent): void;
}

export default function Checkbox({
	name,
	defaultChecked,
	children,
	onChange,
}: CheckboxProps): JSX.Element {
	const [checked, setChecked] = React.useState(defaultChecked ?? 'mixed');

	const toggle = React.useCallback(() => {
		setChecked((prev) => {
			const current = !prev;
			onChange?.({
				name,
				checked: current,
			});
			return current;
		});
	}, [setChecked]);

	return (
		<Clickable
			className="checkbox"
			role="checkbox"
			aria-checked={checked}
			onTrigger={toggle}
		>
			{children}
		</Clickable>
	);
}
