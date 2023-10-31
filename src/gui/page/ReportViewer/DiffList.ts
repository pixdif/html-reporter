import { LitElement, TemplateResult, html } from 'lit';
import { TestPoint } from '@pixdif/model';
import { customElement, property } from 'lit/decorators.js';

function diffLevel(ratio: number): number {
	if (ratio <= 0.01) {
		return 4;
	} if (ratio <= 0.05) {
		return 3;
	} if (ratio <= 0.1) {
		return 2;
	}
	return 1;
}

@customElement('diff-list')
class DiffList extends LitElement {
	@property({ attribute: false }) details?: TestPoint[];

	@property({ attribute: false }) showsMatchedPages?: boolean;

	@property({ attribute: false }) diffThreshold?: number;

	@property({ attribute: false }) expanded = false;

	protected createRenderRoot(): HTMLElement {
		return this;
	}

	override render(): TemplateResult<1> {
		const collapsedLimit = 10;

		const {
			id,
			details,
			showsMatchedPages,
			diffThreshold = 0,
			expanded,
		} = this;

		if (!details) {
			return html``;
		}

		let pages = details.map((point, index) => ({ index, ...point }));
		let pageNum = pages.length;
		if (!showsMatchedPages) {
			pages = pages.filter(({ ratio }) => ratio >= diffThreshold);
			pageNum = pages.length;
		}

		if (!expanded && pages.length > collapsedLimit) {
			pages = pages.slice(0, collapsedLimit);
		}

		const viewerUrl = `index.html?case=${id}`;
		return html`
			${pages.map(({ index, name, ratio }) => {
		const text = `${(ratio * 100).toFixed(3)}%`;
		const className = ratio >= diffThreshold ? `mismatched lv${diffLevel(ratio)}` : 'matched';

		return html`
					<a
						key=${(showsMatchedPages ? 'a' : 's') + (expanded ? 'e' : 'c') + index}
						class=${className}
						target="_blank"
						rel="noreferrer"
						href=${`${viewerUrl}#page${index + 1}`}
						title=${name}
					>
						${text}
					</a>
				`;
	})}
			${pageNum > collapsedLimit ? html`<a href="###" class="expand" @click=${this.#toggle}>${expanded ? 'Show less' : `${pageNum} pages...`}</a>` : null}
		`;
	}

	#toggle = (): void => {
		this.expanded = !this.expanded;
	};
}

export default DiffList;

declare global {
  interface HTMLElementTagNameMap {
    'diff-list': DiffList;
  }
}
