/**
 * Copy files.
 *
 * @link https://github.com/gruntjs/grunt-contrib-copy
 */
module.exports = {
	scaffold: {
		files: [{
			// includes files within path and its sub-directories
			expand: true,
			src:[
				'**/*',
				'.*',
				'!.git/**',
				'!build/**',
				'build',
				'!inc/fonts/**',
				'inc/fonts',
				'!inc/images/**',
				'inc/images',
				'!inc/*.css',
				'!inc/*.map',
				'!src/docx/**',
				'src/docx',
				'!src/intro/*.md',
				'!src/*.md',
				'!filters/**'
			],
			dest: '../<%= book.name %>/',
		}],
	},
};
