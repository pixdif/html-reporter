class Image extends HTMLImageElement {
	connectedCallback(): void {
		this.classList.add('loading');
		this.addEventListener('load', this.#handleLoad);
		this.addEventListener('error', this.#handleError);
	}

	disconnectedCallback(): void {
		this.removeEventListener('error', this.#handleError);
		this.removeEventListener('load', this.#handleLoad);
	}

	#handleLoad = (): void => {
		this.classList.remove('loading');
	};

	#handleError = (): void => {
		this.classList.remove('loading');
		this.classList.add('error');
	};
}

export default Image;

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-image': Image;
  }
}

customElements.define('pixdif-image', Image, { extends: 'img' });
