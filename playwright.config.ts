/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'test',
	outputDir: 'output',
	projects: [
		{
			name: 'chrome',
			use: {
				...devices['Desktop Chrome'],
				channel: 'chrome',
			},
		},
	],
});
