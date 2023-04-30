import { TestReport, TestStatus } from '@pixdif/model';

const testReport: TestReport = {
	config: {
		tolerance: 0.001,
		wsEndpoint: 'localhost:20190',
	},
	cases: {
		a5: {
			name: 'A5',
			path: 'A5.pdf',
			expected: 'baseline/A5.pdf',
			actual: 'output/A5.pdf',
			status: TestStatus.Mismatched,
			details: [
				{
					name: 'Cover',
					ratio: 0.0020112767994604477,
					expected: 'image/A5/expected/1.png',
					actual: 'image/A5/actual/1.png',
					diff: 'image/A5/1.png',
				},
			],
			executionTime: 45482,
		},
		letter: {
			name: 'Letter',
			path: 'category/Letter.pdf',
			expected: 'baseline/category/Letter.pdf',
			actual: 'output/category/Letter.pdf',
			status: 4,
			details: [
				{
					name: 'Overview',
					ratio: 0,
					expected: 'image/Letter/expected/1.png',
					actual: 'image/Letter/actual/1.png',
				},
			],
		},
		two2one: {
			name: 'Two to One',
			path: 'category/Two to One.pdf',
			expected: 'baseline/category/Two to One.pdf',
			actual: 'output/category/Two to One.pdf',
			status: TestStatus.Mismatched,
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
			expected: 'baseline/no baseline.pdf',
			actual: 'output/no baseline.pdf',
			status: TestStatus.ExpectedNotFound,
		},
		one2two: {
			name: 'One to Two',
			path: 'One to Two.pdf',
			expected: 'baseline/One to Two.pdf',
			actual: 'output/One to Two.pdf',
			status: TestStatus.Mismatched,
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
			expected: 'baseline/no output.pdf',
			actual: 'output/no output.pdf',
			status: TestStatus.ActualNotFound,
		},
	},
};

export default testReport;
