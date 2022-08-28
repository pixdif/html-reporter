import BasicLocator from '../base/BasicLocator';
import ReportRow from './ReportRow';

export default class ReportTable extends BasicLocator {
	getRow(index: number) {
		const row = this.getRows().nth(index);
		return new ReportRow(row);
	}

	getRows() {
		return this.locator('tbody tr');
	}
}
