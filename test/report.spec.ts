import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { expect, test } from '@playwright/test';

async function cp(from: string, to: string): Promise<void> {
	const statFrom = fs.statSync(from);
	if (statFrom.isDirectory()) {
		const files = await fsp.readdir(from);
		await Promise.all(files.map((file) => cp(path.join(from, file), path.join(to, file))));
	} else if (statFrom.isFile()) {
		const toDir = path.dirname(to);
		if (!fs.existsSync(toDir)) {
			await fsp.mkdir(toDir, { recursive: true });
		}
		await fsp.copyFile(from, to);
	}
}

test.beforeAll(async () => {
	if (!fs.existsSync('output')) {
		await fsp.mkdir('output');
	}

	await Promise.all([
		cp('test/sample', 'output'),
		cp('dist', 'output'),
	]);
});

test('View a report', async ({ context, page }) => {
	await test.step('Open a report', async () => {
		await page.goto(`file://${path.resolve('output/index.html')}`);
		await page.screenshot({
			path: 'output/report.png',
		});

		const rows = page.locator('table tbody tr');
		expect(await rows.count()).toBe(5);
	});

	await test.step('Check A5', async () => {
		const a5 = page.locator('table tbody tr').nth(0).locator('td');
		expect(await a5.nth(0).textContent()).toBe('A5.pdf');
		expect(await a5.nth(1).locator('a').getAttribute('href')).toBe('baseline/A5.pdf');
		expect(await a5.nth(2).locator('a').getAttribute('href')).toBe('output/A5.pdf');
	});

	await test.step('Check Two to One', async () => {
		const letter = page.locator('table tbody tr').nth(1).locator('td');
		expect(await letter.nth(0).textContent()).toBe('category/Two to One.pdf');
		expect(await letter.nth(1).locator('a').getAttribute('href')).toBe('baseline/category/Two to One.pdf');
		expect(await letter.nth(2).locator('a').getAttribute('href')).toBe('output/category/Two to One.pdf');
	});

	await test.step('Open a specific test case', async () => {
		const a5 = page.locator('table tbody tr', {
			has: page.locator('td', { hasText: 'A5.pdf' }),
		});
		const viewAll = a5.locator('a', { hasText: 'View All' });
		await viewAll.click();

		await context.waitForEvent('page');
		const newPage = context.pages()[1];
		await newPage.screenshot({
			path: 'output/report-A5.png',
		});
	});
});
