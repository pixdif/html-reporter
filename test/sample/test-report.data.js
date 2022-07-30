window.testReport = {
	config: {
		diffThreshold: 0.001,
		wsEndpoint: 'localhost:20190',
	},
	testCases: [{
		id: 1,
		path: 'A5.pdf',
		baseline: 'baseline/A5.pdf',
		actual: 'output/A5.pdf',
		status: 5,
		diffs: [0.0020112767994604477],
	}, {
		id: 2,
		path: 'category/Letter.pdf',
		baseline: 'baseline/category/Letter.pdf',
		actual: 'output/category/Letter.pdf',
		status: 4,
		diffs: [0],
	}, {
		id: 3,
		path: 'category/Two to One.pdf',
		baseline: 'baseline/category/Two to One.pdf',
		actual: 'output/category/Two to One.pdf',
		status: 5,
		diffs: [0.0391375998362074, 1],
	}, {
		id: 4,
		path: 'no baseline.pdf',
		baseline: 'baseline/no baseline.pdf',
		actual: 'output/no baseline.pdf',
		status: 1,
	}, {
		id: 5,
		path: 'One to Two.pdf',
		baseline: 'baseline/One to Two.pdf',
		actual: 'output/One to Two.pdf',
		status: 5,
		diffs: [0.039966599155745484, 1],
	}, {
		id: 6,
		path: 'no output.pdf',
		baseline: 'baseline/no output.pdf',
		actual: 'output/no output.pdf',
		status: 2,
	}],
};
