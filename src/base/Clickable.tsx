import React from 'react';
import { isModifierKeyPressed, isTriggered } from '../util/keyboard';

interface ClickableProps<T extends HTMLElement = HTMLDivElement> extends React.HTMLAttributes<T> {
	component?: React.ElementType;
	onTrigger(event: React.SyntheticEvent<T>): void;
	innerRef?: React.ForwardedRef<T>;
}

export function Clickable<T extends HTMLElement = HTMLDivElement>({
	innerRef,
	component: Component = 'div',
	role = 'button',
	tabIndex = 0,
	onTrigger,
	onClick,
	onKeyDown,
	children,
	...otherProps
}: ClickableProps<T>): JSX.Element {
	const handleClick = React.useCallback((e: React.MouseEvent<T>) => {
		onTrigger(e);
		onClick?.(e);
	}, [onClick]);

	const handleKeyDown = React.useCallback((e: React.KeyboardEvent<T>) => {
		if (!isModifierKeyPressed(e) && isTriggered(e)) {
			onTrigger(e);
		}
		onKeyDown?.(e);
	}, [onKeyDown]);

	return (
		<Component
			ref={innerRef}
			role={role}
			tabIndex={tabIndex}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
			{...otherProps}
		>
			{children}
		</Component>
	);
}

export default React.forwardRef<HTMLDivElement, ClickableProps>(
	(props, ref) => <Clickable innerRef={ref} {...props} />,
);
