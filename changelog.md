# Changelog

**./package.json**
* Added separate NPM scripts to execute different unit test groups.
	* They all execute `./node_modules/mocha/bin/mocha` but with a different argument.
	* This argument will be read by the unit testing script.
	* Argument determines what unit test group will be run.
* Testing is now called using `npm run test-\<mode\>`

---

**./test-parts/mode-input.js**
* New file - Reads unit test mode argument.

---

**./test/index.js**
* Added new requirement: `../test-parts/mode-input`
* Commented out `describe` block.
* Wrote main function 'runUnitTests'
	* Reads mode argument from NPM script.
	* Executes unit test function according to argument.
	* If argument is unknown, output message.