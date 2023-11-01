import { LitElement, TemplateResult, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import './FullscreenViewer';
import './Image';
import './ImageViewer.scss';

@customElement('pixdif-image-viewer')
export default class ImageViewer extends LitElement {
	className = 'image-viewer';

	src?: string;

	alt?: string;

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		return html`
			<pixdif-fullscreen-viewer>
				<img is="pixdif-image" src=${ifDefined(this.src)} alt=${ifDefined(this.alt)}>
			</pixdif-fullscreen-viewer>
		`;
	}
}

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-image-viewer': ImageViewer;
  }
}
