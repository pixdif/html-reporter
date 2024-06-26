import BasicLocator from '../base/BasicLocator.js';

export default class ReportRow extends BasicLocator {
	getCell(index: number) {
		return this.locator('td').nth(index);
	}

	getName() {
		return this.getCell(0).innerText();
	}

	getPath() {
		return this.getCell(0).locator('a').getAttribute('href');
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

	getStartTime() {
		return this.getCell(3).innerText();
	}

	getEndTime() {
		return this.getCell(4).innerText();
	}

	getStatus() {
		return this.getCell(5).innerText();
	}

	getViewAll() {
		return this.getCell(6).locator('a');
	}

	getDiffs() {
		return this.getCell(7);
	}
}
