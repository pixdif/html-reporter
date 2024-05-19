import {
	LitElement,
	TemplateResult,
	html,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ColumnDefinition, TestCase } from '@pixdif/model';

import './DiffRatios';
import './StatusIcon';

@customElement('pixdif-report-row')
class ReportRow extends LitElement {
	role = 'row';

	@property({ attribute: false }) extraColumns?: ColumnDefinition[];

	@property({ attribute: false }) testCase?: TestCase;

	@property({ attribute: false }) tolerance?: number;

	@property({ attribute: false }) showsMatchedPages?: boolean;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		const {
			id,
			extraColumns = [],
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
			details = [],
			status,
			extra = {},
		} = testCase;

		const viewerUrl = `index.html?case=${id}`;
		return html`
			<td class="url">${path ? html`<a href=${path}>${name}</a>` : name}</td>
			<td>
				<a href=${expected} target="_blank" rel="noreferrer">View</a>
			</td>
			<td>
				<a href=${actual} target="_blank" rel="noreferrer">View</a>
			</td>
			${extraColumns.map((col) => html`<td>${extra[col[2]]}</td>`)}
			<td>
				<pixdif-status-icon .status=${status}></pixdif-status-icon>
			</td>
			<td class="view-all">
				<a target="_blank" rel="noreferrer" href=${viewerUrl}>View All</a>
			</td>
			<td class="difference">
				${details && html`
					<pixdif-diff-ratios
						id=${id}
						.details=${details}
						.showsMatchedPages=${showsMatchedPages}
						.diffThreshold=${tolerance}
					>
					</pixdif-diff-ratios>
				`}
			</td>
		`;
	}
}

export default ReportRow;
