import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { expect, test } from '@playwright/test';

import cp from './util/cp';
import rimraf from './util/rimraf';

import ReportViewer from './object/ReportViewer';

import sampleData from './sample/data';
import generateReport from '../dist';

test.beforeAll(async () => {
	if (fs.existsSync('output')) {
		await rimraf('output');
	}

	await fsp.mkdir('output/image', { recursive: true });
	await cp('test/sample/image', 'output/image');
	await generateReport(sampleData, 'output');
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
		expect(await a5.getStatus()).toBe('Failed');
		expect(await a5.getExecutionTime()).toBe('45.482');
	});

	await test.step('Check Two to One', async () => {
		const letter = table.getRow(1);
		expect(await letter.getPath()).toBe('category/Two to One.pdf');
		expect(await letter.getExpectedPath()).toBe('baseline/category/Two to One.pdf');
		expect(await letter.getActualPath()).toBe('output/category/Two to One.pdf');
		expect(await letter.getStatus()).toBe('Failed');
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
		expect(await letter.getStatus()).toBe('Passed');
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

		const h4 = newPage.locator('h4');
		expect(await h4.textContent()).toContain('Cover');
	});
});
