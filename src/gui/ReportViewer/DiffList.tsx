import { TestPoint } from '@pixdif/model';
import React from 'react';

function diffLevel(ratio: number): number {
	if (ratio <= 0.01) {
		return 4;
	} if (ratio <= 0.05) {
		return 3;
	} if (ratio <= 0.1) {
		return 2;
	}
	return 1;
}

interface DiffListProps {
	id: string;
	details: TestPoint[];
	showsMatchedPages: boolean;
	diffThreshold: number;
}

export default function DiffList(props: DiffListProps): JSX.Element | null {
	const collapsedLimit = 10;

	const {
		id,
		details,
		showsMatchedPages,
		diffThreshold,
	} = props;

	const [expanded, setExpanded] = React.useState(false);

	function toggle(): void {
		setExpanded((prev) => !prev);
	}

	if (!details) {
		return null;
	}

	let pages = details.map((point, index) => ({ index, ...point }));
	let pageNum = pages.length;
	if (!showsMatchedPages) {
		pages = pages.filter(({ ratio }) => ratio >= diffThreshold);
		pageNum = pages.length;
	}

	if (!expanded && pages.length > collapsedLimit) {
		pages = pages.slice(0, collapsedLimit);
	}

	const viewerUrl = `index.html?case=${id}`;
	return (
		<div>
			{pages.map(({ index, name, ratio }) => {
				const text = `${(ratio * 100).toFixed(3)}%`;
				const className = ratio >= diffThreshold ? `mismatched lv${diffLevel(ratio)}` : 'matched';

				return (
					<a
						key={(showsMatchedPages ? 'a' : 's') + (expanded ? 'e' : 'c') + index}
						className={className}
						target="_blank"
						rel="noreferrer"
						href={`${viewerUrl}#page${index + 1}`}
						title={name}
					>
						{text}
					</a>
				);
			})}
			{pageNum > collapsedLimit ? <a href="###" className="expand" onClick={toggle}>{expanded ? 'Show less' : `${pageNum} pages...`}</a> : null}
		</div>
	);
}
