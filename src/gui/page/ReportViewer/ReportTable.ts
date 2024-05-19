import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	TestReport,
	TestStatus,
} from '@pixdif/model';

import './ReportRow';
import './ReportTable.scss';

@customElement('pixdif-report-table')
class ReportTable extends LitElement {
	role = 'table';

	report?: TestReport;

	className = 'test-report';

	@property({ attribute: false }) showsMatchedCases?: boolean;

	@property({ attribute: false }) showsMatchedPages?: boolean;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		const { report } = this;
		if (!report) {
			return html``;
		}

		const {
			config,
		} = report;

		const testCases = Object.values(report.cases);

		const {
			showsMatchedCases = testCases.length > 0 && testCases.every(
				(tc) => tc.status === TestStatus.Matched,
			),
			showsMatchedPages = false,
		} = this;

		return html`
			<thead>
				<tr>
					<td>
						Test Case
						<div class="float-options">
							<input
								type="checkbox"
								id="show-matched-cases"
								name="show-matched-cases"
								?checked=${showsMatchedCases}
								@change=${this.#toggleMatchedCases}
							/>
							<label for="show-matched-cases">Shows passed</label>
						</div>
					</td>
					<td>Expected</td>
					<td>Actual</td>
					<td>Result</td>
					<td>Images</td>
					<td>
						Difference
						<div class="float-options">
							<input
								type="checkbox"
								id="show-matched-pages"
								name="show-matched-pages"
								?checked=${showsMatchedPages}
								@change=${this.#toggleMatchedPages}
							/>
							<label for="show-matched-pages">Shows passed</label>
						</div>
					</td>
				</tr>
			</thead>
			<tbody>
				${Object.entries(report.cases).map(([id, testCase]) => {
		if (!showsMatchedCases && testCase.status === TestStatus.Matched) {
			return '';
		}
		return html`
			<pixdif-report-row
				id=${id}
				.tolerance=${config.tolerance}
				.showsMatchedCases=${showsMatchedCases}
				.showsMatchedPages=${showsMatchedPages}
				.testCase=${testCase}
			></pixdif-report-row>
		`;
	})}
			</tbody>
		`;
	}

	#toggleMatchedCases = (): void => {
		this.showsMatchedCases = !this.showsMatchedCases;
	};

	#toggleMatchedPages = (): void => {
		this.showsMatchedPages = !this.showsMatchedPages;
	};
}

export default ReportTable;

declare global {
	interface HTMLElementTagNameMap {
		'pixdif-report-table': ReportTable;
	}
}
