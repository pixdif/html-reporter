import BasicLocator from '../base/BasicLocator.js';
import ReportRow from './ReportRow.js';

export default class ReportTable extends BasicLocator {
	getRow(index: number) {
		const row = this.getRows().nth(index);
		return new ReportRow(row);
	}

	getRows() {
		return this.locator('tbody').getByRole('row');
	}

	getShowMatchedCases() {
		return this.locator('thead input[type="checkbox"][name="show-matched-cases"]');
	}

	getShowMatchedPages() {
		return this.locator('thead input[type="checkbox"][name="show-matched-pages"]');
	}
}
