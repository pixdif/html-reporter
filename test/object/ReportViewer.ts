import BasicPage from './base/BasicPage.js';
import ReportTable from './report/ReportTable.js';

export default class ReportViewer extends BasicPage {
	getTable() {
		const table = this.getByRole('table');
		return new ReportTable(table);
	}
}
