import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TestReport } from '@pixdif/model';

import '../DiffViewer';

@customElement('pixdif-diff-flow')
class DiffFlow extends LitElement {
	report?: TestReport;

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
			extraColumns = [],
		} = report;

		const testCases = Object.values(report.cases);
		extraColumns.sort((a, b) => a[0] - b[0]);

		return html`${testCases.map(
			(tc) => (
				html`<pixdif-diff-viewer .config=${config} .testCase=${tc}></pixdif-diff-viewer>`
			),
		)}`;
	}
}

export default DiffFlow;

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-diff-flow': DiffFlow;
  }
}
