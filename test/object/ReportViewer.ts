import BasicPage from './base/BasicPage';
import ReportTable from './report/ReportTable';

export default class ReportViewer extends BasicPage {
	getTable() {
		const table = this.getByRole('table');
		return new ReportTable(table);
	}
}
