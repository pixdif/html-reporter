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

		const rows = await page.$$('table tbody tr');
		expect(rows.length).toBe(5);
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
