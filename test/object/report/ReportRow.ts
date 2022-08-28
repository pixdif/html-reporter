import BasicLocator from '../base/BasicLocator';

export default class ReportRow extends BasicLocator {
	getCell(index: number) {
		return this.locator('td').nth(index);
	}

	getPath() {
		return this.getCell(0).textContent();
	}

	getExpected() {
		return this.getCell(1).locator('a');
	}

	getExpectedPath() {
		return this.getExpected().getAttribute('href');
	}

	getActual() {
		return this.getCell(2).locator('a');
	}

	getActualPath() {
		return this.getActual().getAttribute('href');
	}

	getExecutionTime() {
		return this.getCell(3).textContent();
	}

	getStatus() {
		return this.getCell(4);
	}

	getViewAll() {
		return this.getCell(5).locator('a');
	}

	getDiffs() {
		return this.getCell(6);
	}
}
