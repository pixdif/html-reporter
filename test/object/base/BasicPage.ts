import { Page } from '@playwright/test';
import { LocatorOptions } from './BasicLocator.js';

export default class BasicPage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	locator(selector: string, options?: LocatorOptions) {
		return this.page.locator(selector, options);
	}

	getByRole(...args: Parameters<Page['getByRole']>) {
		return this.page.getByRole(...args);
	}
}
