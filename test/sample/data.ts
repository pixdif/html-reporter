const testReport = {
	config: {
		tolerance: 0.001,
		wsEndpoint: 'localhost:20190',
	},
	testCases: [{
		id: 1,
		name: 'A5',
		path: 'A5.pdf',
		expected: 'baseline/A5.pdf',
		actual: 'output/A5.pdf',
		status: 5,
		diffs: [0.0020112767994604477],
		executionTime: 45482,
	}, {
		id: 2,
		name: 'Letter',
		path: 'category/Letter.pdf',
		expected: 'baseline/category/Letter.pdf',
		actual: 'output/category/Letter.pdf',
		status: 4,
		diffs: [0],
	}, {
		id: 3,
		name: 'Two to One',
		path: 'category/Two to One.pdf',
		expected: 'baseline/category/Two to One.pdf',
		actual: 'output/category/Two to One.pdf',
		status: 5,
		diffs: [0.0391375998362074, 1],
	}, {
		id: 4,
		name: 'no baseline',
		path: 'no baseline.pdf',
		expected: 'baseline/no baseline.pdf',
		actual: 'output/no baseline.pdf',
		status: 1,
	}, {
		id: 5,
		name: 'One to Two',
		path: 'One to Two.pdf',
		expected: 'baseline/One to Two.pdf',
		actual: 'output/One to Two.pdf',
		status: 5,
		diffs: [0.039966599155745484, 1],
	}, {
		id: 6,
		name: 'no output',
		path: 'no output.pdf',
		expected: 'baseline/no output.pdf',
		actual: 'output/no output.pdf',
		status: 2,
	}],
};

export default testReport;
