import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { TestReport } from '@pixdif/model';

import './ProfileArea';
import './ReportTable';

import './index.scss';

@customElement('pixdif-report-viewer')
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
			<pixdif-profile-area .report=${report}></pixdif-profile-area>
			<pixdif-report-table .report=${report}></pixdif-report-table>
		`;
	}
}

export default ReportViewer;

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-report-viewer': ReportViewer;
  }
}
