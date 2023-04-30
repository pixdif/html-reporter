import React from 'react';
import Collapse from '../Collapse';
import TreeNode from './TreeNode';

interface TreeOptionProps {
	label: string;
	options?: TreeNode[];
}

export default function TreeOption({
	label,
	options,
}: TreeOptionProps): JSX.Element {
	if (!options || options.length <= 0) {
		return (
			<div className="tree-option">
				{label}
			</div>
		);
	}

	return (
		<Collapse
			className="tree-option"
			header={label}
		>
			{options.map((option) => (
				<TreeOption
					label={option.label}
					options={option.children}
				/>
			))}
		</Collapse>
	);
}
