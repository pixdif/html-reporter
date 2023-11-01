import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import {
	TestReport,
	TestStatus,
} from '@pixdif/model';

function countItem<Type>(arr: Type[], condition: (e: Type) => boolean): number {
	let num = 0;
	for (const item of arr) {
		if (condition(item)) {
			num++;
		}
	}
	return num;
}

export interface ProfileAreaProps {
	report?: TestReport;
}

@customElement('pixdif-profile-area')
class ProfileArea extends LitElement implements ProfileAreaProps {
	report?: TestReport;

	protected override createRenderRoot(): HTMLElement {
		return this;
	}

	override render() {
		const { report } = this;
		if (!report) {
			return;
		}

		const { config } = report;
		const testCases = Object.values(report.cases);
		const failureNum = countItem(
			testCases,
			(testCase) => testCase.status === TestStatus.Mismatched,
		);
		const passRatio = (failureNum / testCases.length) * 100;
		const passRatioText = passRatio ? passRatio.toFixed(2) : 0;

		return html`
			<dl>
				<dt>Failure Ratio</dt>
				<dd>
					<span class="percent">${passRatioText}</span>
				</dd>
				<dd>
					<span class="progress-bar">
						<span class="current">${failureNum}</span>
						<span class="limit">${testCases.length}</span>
					</span>
				</dd>
				<dt>Difference Tolerance</dt>
				<dd>
					<span class="percent">${(config.tolerance * 100).toFixed(1)}</span>
				</dd>
			</dl>
		`;
	}
}

export default ProfileArea;

declare global {
  interface HTMLElementTagNameMap {
    'pixdif-profile-area': ProfileArea;
  }
}
