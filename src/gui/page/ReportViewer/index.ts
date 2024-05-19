import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TestReport } from '@pixdif/model';

import './ProfileArea';
import './ReportTable';
import './ReportFlow';

import './index.scss';

@customElement('pixdif-report-viewer')
class ReportViewer extends LitElement {
	report?: TestReport;

	mode?: string;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	#renderMain(): TemplateResult<1> {
		if (this.mode === 'flow') {
			return html`<pixdif-report-flow .report=${this.report}></pixdif-report-flow>`;
		}
		return html`<pixdif-report-table .report=${this.report}></pixdif-report-table>`;
	}

	override render(): TemplateResult<1> {
		const { report } = this;
		if (!report) {
			return html``;
		}

		return html`
			<pixdif-profile-area .report=${report}></pixdif-profile-area>
			${this.#renderMain()}
		`;
	}
}

export default ReportViewer;

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-report-viewer': ReportViewer;
  }
}
