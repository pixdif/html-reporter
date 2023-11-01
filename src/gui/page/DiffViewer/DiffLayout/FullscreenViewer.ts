import Button from '@cindi/aria-lit/Button';
import { customElement } from 'lit/decorators.js';

import './FullscreenViewer.scss';

@customElement('pixdif-fullscreen-viewer')
class FullscreenViewer extends Button {
	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('trigger', this.#toggleFullscreen);
	}

	override disconnectedCallback(): void {
		this.removeEventListener('trigger', this.#toggleFullscreen);
		super.disconnectedCallback();
	}

	#toggleFullscreen = (): void => {
		if (document.fullscreenElement !== this) {
			this.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};
}

export default FullscreenViewer;

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-fullscreen-viewer': FullscreenViewer;
  }
}
