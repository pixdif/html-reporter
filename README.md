# Pixdif HTML Reporter
[![Build Status](https://github.com/pixdif/html-reporter/workflows/Node.js%20CI/badge.svg?branch=main)](https://github.com/pixdif/html-reporter/actions?query=workflow%3ANode.js%20CI+branch%3Amain)
[![Npm Package](https://img.shields.io/npm/v/@pixdif/html-reporter.svg)](https://npmjs.org/package/@pixdif/html-reporter)

This is an extension for [pixdif](https://github.com/pixdif/pixdif) to display test results as a web page, and update baseline files in visual test reports. The web page is super tiny (unpacked size < 60KB) and fast because it is built with only a few [web components](https://developer.mozilla.org/en-US/docs/Web/API/Web_components) based on [lit](https://lit.dev).

## License

[MIT](http://opensource.org/licenses/MIT)


### Features
- Display all test cases in a table with brief test results.
- Click a test case to view all visual differences.
- Update baselines with one click (via REST APIs from [pixdif](https://github.com/pixdif/pixdif)).
- Scroll up and down to view all visual differences in one page.
- Add custom extra columns to the table.

## Installation

```sh
npm install @pixdif/html-reporter
```

## Example

```ts
import type { TestReport } from '@pixdif/model';
import generateReport from '@pixdif/html-reporter';

const sample: TestReport = {
	// your test results
};
await generateReport(sample, 'output');
```
