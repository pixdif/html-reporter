import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TestReport } from '@pixdif/model';

import './ProfileArea';
import './ReportTable';

import './index.scss';

@customElement('report-viewer')
class ReportViewer extends LitElement {
	report?: TestReport;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		const { report } = this;
		if (!report) {
			return html``;
		}

		return html`
			<profile-area .report=${report}></profile-area>
			<report-table .report=${report}></report-table>
		`;
	}
}

export default ReportViewer;

declare global {
  interface HTMLElementTagNameMap {
    'report-viewer': ReportViewer;
  }
}
