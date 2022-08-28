import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { expect, test } from '@playwright/test';
import ReportViewer from './object/ReportViewer';

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
	const report = new ReportViewer(page);
	const table = report.getTable();

	await test.step('Open a report', async () => {
		await page.goto(`file://${path.resolve('output/index.html')}`);
		await page.screenshot({
			path: 'output/report-default.png',
		});

		const rows = table.getRows();
		expect(await rows.count()).toBe(5);
	});

	await test.step('Check A5', async () => {
		const a5 = table.getRow(0);
		expect(await a5.getPath()).toBe('A5.pdf');
		expect(await a5.getExpectedPath()).toBe('baseline/A5.pdf');
		expect(await a5.getActualPath()).toBe('output/A5.pdf');
		expect(await a5.getStatus()).toBe('No');
	});

	await test.step('Check Two to One', async () => {
		const letter = table.getRow(1);
		expect(await letter.getPath()).toBe('category/Two to One.pdf');
		expect(await letter.getExpectedPath()).toBe('baseline/category/Two to One.pdf');
		expect(await letter.getActualPath()).toBe('output/category/Two to One.pdf');
		expect(await letter.getStatus()).toBe('No');
	});

	await test.step('Toggle matched cases', async () => {
		const checkbox = table.getShowMatchedCases();
		await checkbox.click();

		await page.screenshot({
			path: 'output/report-all-cases.png',
		});

		const rows = table.getRows();
		expect(await rows.count()).toBe(6);
	});

	await test.step('Check Letter', async () => {
		const letter = table.getRow(1);
		expect(await letter.getPath()).toBe('category/Letter.pdf');
		expect(await letter.getExpectedPath()).toBe('baseline/category/Letter.pdf');
		expect(await letter.getActualPath()).toBe('output/category/Letter.pdf');
		expect(await letter.getStatus()).toBe('Yes');
		expect(await letter.getDiffs().textContent()).toBe('');
	});

	await test.step('Toggle matched pages', async () => {
		const checkbox = table.getShowMatchedPages();
		await checkbox.click();

		await page.screenshot({
			path: 'output/report-all-pages.png',
		});

		const letter = table.getRow(1);
		expect(await letter.getDiffs().textContent()).toBe('0.000%');
	});

	await test.step('Open a specific test case', async () => {
		const a5 = table.getRow(0);
		const viewAll = a5.getViewAll();
		await viewAll.click();

		await context.waitForEvent('page');
		const newPage = context.pages()[1];
		await newPage.screenshot({
			path: 'output/report-A5.png',
		});
	});
});
