import { Locator } from '@playwright/test';

export interface LocatorOptions {
	has?: Locator;
	hasText?: string;
}

export default class BasicLocator {
	protected readonly e: Locator;

	constructor(e: Locator) {
		this.e = e;
	}

	page() {
		return this.e.page();
	}

	locator(selector: string, options?: LocatorOptions) {
		return this.e.locator(selector, options);
	}

	getByRole(...args: Parameters<Locator['getByRole']>) {
		return this.e.getByRole(...args);
	}
}
