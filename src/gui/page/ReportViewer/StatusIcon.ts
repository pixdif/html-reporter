import { Progress, TestStatus } from '@pixdif/model';
import { LitElement, TemplateResult, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('pixdif-status-icon')
class StatusIcon extends LitElement {
	@property({
		type: Number,
		converter: {
			toAttribute(value) {
				switch (value) {
				case TestStatus.Matched: return 'matched';
				case TestStatus.Mismatched: return 'mismatched';
				default: return '';
				}
			},
		},
		reflect: true,
	}) status?: TestStatus;

	progress?: Progress;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		const {
			status = TestStatus.Unexecuted,
			progress,
		} = this;

		if (status === TestStatus.InProgress) {
			if (!progress) {
				return html``;
			}

			return html`
				<span class="current">${progress.current}</span>
				<span class="limit">${progress.limit}</span>
			`;
		}

		if (status === TestStatus.Matched) {
			return html`Passed`;
		}

		if (status === TestStatus.Mismatched) {
			return html`Failed`;
		}

		return html``;
	}
}

export default StatusIcon;

declare global {
	interface HTMLElementTagNameMap {
		'pixdif-status-icon': StatusIcon;
	}
}
