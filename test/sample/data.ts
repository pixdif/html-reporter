import { TestReport } from '@pixdif/model';

/**
 * @typedef {import('@pixdif/model').TestStatus} TestStatus
 */

const testReport: TestReport = {
	title: 'Sample Report of PDF Files',
	config: {
		tolerance: 0.001,
		wsEndpoint: 'localhost:20190',
	},
	extraColumns: [
		[0, 'Start Time', 'startTime'],
		[1, 'End Time', 'endTime'],
	],
	cases: {
		a5: {
			name: 'A5',
			path: 'A5.pdf',
			expected: 'expected/A5.pdf',
			actual: 'actual/A5.pdf',
			/**
			* @type {TestStatus.Mismatched}
			*/
			status: 5,
			details: [
				{
					name: 'Cover',
					ratio: 0.0020112767994604477,
					expected: 'image/A5/expected/1.png',
					actual: 'image/A5/actual/1.png',
					diff: 'image/A5/1.png',
				},
			],
			extra: {
				startTime: 39503485,
				endTime: 39503485 + 45482,
			},
		},
		letter: {
			name: 'Letter',
			path: 'category/Letter.pdf',
			expected: 'expected/category/Letter.pdf',
			actual: 'actual/category/Letter.pdf',
			/**
			 * @type {TestStatus.Matched}
			 */
			status: 4,
			details: [
				{
					name: 'Overview',
					ratio: 0,
					expected: 'image/category/Letter/expected/1.png',
					actual: 'image/category/Letter/actual/1.png',
				},
			],
		},
		two2one: {
			name: 'Two to One',
			path: 'category/Two to One.pdf',
			expected: 'expected/category/Two to One.pdf',
			actual: 'actual/category/Two to One.pdf',
			/**
			* @type {TestStatus.Mismatched}
			*/
			status: 5,
			details: [
				{
					name: 'Page 1',
					ratio: 0.0391375998362074,
					expected: 'image/Two to One/expected/1.png',
					actual: 'image/Two to One/actual/1.png',
					diff: 'image/Two to One/1.png',
				},
				{
					name: 'Page 2',
					ratio: 1,
					expected: 'image/Two to One/expected/2.png',
					actual: 'image/Two to One/actual/2.png',
					diff: 'image/Two to One/2.png',
				},
			],
		},
		noExpected: {
			name: 'no baseline',
			path: 'no baseline.pdf',
			expected: 'expected/no baseline.pdf',
			actual: 'actual/no baseline.pdf',
			/**
			 * @type {TestStatus.ExpectedNotFound}
			 */
			status: 1,
		},
		one2two: {
			name: 'One to Two',
			path: 'One to Two.pdf',
			expected: 'expected/One to Two.pdf',
			actual: 'actual/One to Two.pdf',
			/**
			 * @type {TestStatus.Mismatched}
			 */
			status: 5,
			details: [
				{
					name: 'Page A',
					ratio: 0.039966599155745484,
					expected: 'image/One to Two/expected/1.png',
					actual: 'image/One to Two/actual/1.png',
					diff: 'image/One to Two/1.png',
				},
				{
					name: 'Page B',
					ratio: 1,
					expected: 'image/One to Two/expected/2.png',
					actual: 'image/One to Two/actual/2.png',
					diff: 'image/One to Two/2.png',
				},
			],
		},
		noActual: {
			name: 'no output',
			path: 'no output.pdf',
			expected: 'expected/no output.pdf',
			actual: 'actual/no output.pdf',
			/**
			 * @type {TestStatus.ActualNotFound}
			 */
			status: 2,
		},
	},
};

export default testReport;
