import {
	LitElement,
	TemplateResult,
	html,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { TestCase } from '@pixdif/model';

import './DiffList';
import './StatusIcon';

@customElement('report-row')
class ReportRow extends LitElement {
	role = 'row';

	@property({ attribute: false }) testCase?: TestCase;

	@property({ attribute: false }) tolerance?: number;

	@property({ attribute: false }) showsMatchedPages?: boolean;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		const {
			id,
			testCase,
			tolerance,
			showsMatchedPages,
		} = this;
		if (!testCase) {
			return html``;
		}

		const {
			name,
			path,
			expected,
			actual,
			startTime,
			endTime,
			details = [],
			status,
			comment,
		} = testCase;

		const executionTime = endTime !== undefined && startTime !== undefined
			? (endTime - startTime)
			: undefined;

		const viewerUrl = `index.html?case=${id}`;
		return html`
			<td class="url" title=${ifDefined(comment)}>${path ? html`<a href=${path}>${name}</a>` : name}</td>
			<td>
				<a href=${expected} target="_blank" rel="noreferrer">View</a>
			</td>
			<td>
				<a href=${actual} target="_blank" rel="noreferrer">View</a>
			</td>
			<td>
				${executionTime !== undefined ? (executionTime / 1000).toFixed(3) : ''}
			</td>
			<td>
				<status-icon .status=${status}></status-icon>
			</td>
			<td class="view-all">
				<a target="_blank" rel="noreferrer" href=${viewerUrl}>View All</a>
			</td>
			<td class="difference">
				${details && html`
					<diff-list
						id=${id}
						.details=${details}
						.showsMatchedPages=${showsMatchedPages}
						.diffThreshold=${tolerance}
					>
					</diff-list>
				`}
			</td>
		`;
	}
}

export default ReportRow;
