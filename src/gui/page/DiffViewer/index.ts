import {
	LitElement,
	TemplateResult,
	html,
	nothing,
} from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
	Config,
	TestCase,
	TestStatus,
} from '@pixdif/model';

import makeToast from '../../util/makeToast';
import './DiffLayout';
import './styles.scss';

let ariaId = 1;

@customElement('pixdif-diff-viewer')
class DiffViewer extends LitElement {
	config?: Config;

	testCase?: TestCase;

	@state()
	protected matchedHidden = true;

	#toggleMatchedId = `hide-matched-${ariaId++}`;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		if (this.testCase) {
			document.title = `${this.testCase.name} - ${document.title}`;
		}
	}

	#toggleMatched = (): void => {
		this.matchedHidden = !this.matchedHidden;
	};

	#updateBaseline = async (): Promise<void> => {
		const { testCase } = this;
		if (!testCase) {
			return;
		}

		const payload = {
			expected: testCase.expected,
			actual: testCase.actual,
		};
		try {
			const res = await window.fetch('/api/snapshots', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
			switch (res.status) {
			case 200:
				makeToast('The snapshot has been successfully updated.');
				break;
			default:
				makeToast('Failed to write to the snapshot file.');
				break;
			}
		} catch (error) {
			makeToast('Failed to connect to the server. Please run `pixdif serve`', 'error');
		}
	};

	override render(): TemplateResult<1> {
		const { config, testCase } = this;
		if (!config || !testCase) {
			return html``;
		}

		const tolerance = config.tolerance ?? 0;
		const toleranceText = (tolerance * 100).toFixed(3);
		const { status } = testCase;

		return html`
			<h2>${testCase.path ? html`<a href=${testCase.path}>${testCase.name}</a>` : testCase.name}</h2>
				<div class="control-panel">
					<input
						type="checkbox"
						id=${this.#toggleMatchedId}
						?checked=${this.matchedHidden}
						@change=${this.#toggleMatched}
					/>
					<label for=${this.#toggleMatchedId}>
						Hide matched pages
						<span class="threshold">${toleranceText}</span>
					</label>
				</div>
				<h3 class="diff-layout">
					<p><a href=${testCase.expected} target="_blank" rel="noreferrer">Expected</a></p>
					<p>Difference</p>
					<p><a href=${testCase.actual} target="_blank" rel="noreferrer">Actual</a></p>
				</h3>
				<ul class="page-list">
					${testCase.details?.map((tp, index) => {
		if (tp.ratio <= tolerance && this.matchedHidden) {
			return '';
		}

		let className: string | undefined;
		if (!this.matchedHidden) {
			className = tp.ratio <= tolerance ? 'matched' : 'unmatched';
		}
		const anchorName = `page${index}`;
		const ratioText = (tp.ratio * 100).toFixed(3);
		return html`
			<li class=${ifDefined(className)}>
				<h4>
					<span id=${anchorName}>${tp.name}</span>
					<em class="ratio">${ratioText}</em>
				</h4>
				<pixdif-diff-layout .expected=${tp.expected} .actual=${tp.actual} .diff=${tp.diff}></pixdif-diff-layout>
			</li>
		`;
	})}
				</ul>
				${window.location.protocol !== 'file:' && (status === TestStatus.ExpectedNotFound || status === TestStatus.Mismatched) ? html`
					<div class="button-area">
						<button
							type="button"
							@click=${this.#updateBaseline}
						>
							${testCase.status === TestStatus.ExpectedNotFound ? 'Add Baseline' : 'Update Baseline'}
						</button>
					</div>
				` : nothing}
			</div>
		`;
	}
}

export default DiffViewer;

declare global {
	interface HTMLElementTagNameMap {
		'pixdif-diff-viewer': DiffViewer;
	}
}
