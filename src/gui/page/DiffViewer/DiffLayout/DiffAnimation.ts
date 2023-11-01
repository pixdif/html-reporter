import { LitElement, TemplateResult, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './FullscreenViewer';
import './Image';
import './DiffAnimation.scss';

@customElement('pixdif-diff-animation')
export default class DiffAnimation extends LitElement {
	className = 'image-viewer';

	base?: string;

	diff?: string;

	target?: string;

	@state()
	protected fullscreen?: boolean;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		return html`
			<pixdif-fullscreen-viewer @fullscreenchange=${this.#handleFullscreenChange}>
				<img is="pixdif-image" class="baseline" src=${this.base ?? ''} alt="Baseline">
				${this.fullscreen ? html`
					<div class="overlay">
						<img is="pixdif-image" class="actual" src=${this.target ?? ''} alt="Actual">
					</div>
				` : html`
					<div class="overlay gray">
						${this.diff ? html`<img is="pixdif-image" class="diff" src=${this.diff} alt="Difference">` : ''}
					</div>
				`}
			</pixdif-fullscreen-viewer>
		`;
	}

	#handleFullscreenChange(): void {
		if (document.fullscreenElement) {
			this.fullscreen = true;
		} else {
			this.fullscreen = false;
		}
	}
}

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-diff-animation': DiffAnimation;
  }
}
