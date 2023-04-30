import React from 'react';

import TreeNode from './TreeNode';
import TreeOption from './TreeOption';

import './index.scss';

interface TreeProps {
	options: TreeNode[];
}

export default function Tree({
	options,
}: TreeProps): JSX.Element {
	return (
		<div className="tree">
			{options.map((option) => (
				<TreeOption
					label={option.label}
					options={option.children}
				/>
			))}
		</div>
	);
}
