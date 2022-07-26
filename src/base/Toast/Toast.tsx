import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import classNames from 'classnames';

import { MessageLevel } from '@pixdif/model';

import './Toast.scss';

interface ToastProps {
	root: Root;
	level?: MessageLevel;
	timeout?: number;
	children?: React.ReactNode;
}

type Phase = '' | 'appear' | 'disappear';

export default function Toast(props: ToastProps): JSX.Element {
	const {
		root,
		level,
		timeout = 1000,
		children,
	} = props;

	const [phase, setPhase] = React.useState<Phase>('');

	React.useEffect(() => {
		setTimeout(() => setPhase('appear'), 0);
		setTimeout(() => setPhase('disappear'), timeout);
		setTimeout(() => {
			root.unmount();
		}, timeout + 300);
	});

	return (
		<div className={classNames('toast', level, phase)}>
			{children}
		</div>
	);
}

function makeCover(container: HTMLElement) {
	let cover = container.querySelector('#cover');
	if (!cover) {
		cover = document.createElement('div');
		cover.id = 'cover';
		container.appendChild(cover);
	}
	return cover;
}

/**
 * Show a toast on the screen and it disappears
 * @param text
 * @param level normal, info, warning or error
 * @param container
 */
export function makeToast(text: string, level: MessageLevel = 'normal', container = document.body): void {
	const cover = makeCover(container);
	const root = createRoot(cover);
	root.render(
		<Toast level={level} root={root}>
			{text}
		</Toast>,
	);
}
