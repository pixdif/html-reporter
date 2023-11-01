import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './ImageViewer';
import './DiffAnimation';
import './index.scss';

@customElement('pixdif-diff-layout')
export default class DiffLayout extends LitElement {
	className = 'diff-layout';

	expected?: string;

	actual?: string;

	diff?: string;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		return html`
			<pixdif-image-viewer .src=${this.expected} .alt=${'Expected Image'}></pixdif-image-viewer>
			<pixdif-diff-animation .base=${this.expected} .diff=${this.diff} .target=${this.actual}></pixdif-diff-animation>
			<pixdif-image-viewer .src=${this.actual} .alt=${'Actual Image'}></pixdif-image-viewer>
		`;
	}
}

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-diff-layout': DiffLayout;
  }
}
