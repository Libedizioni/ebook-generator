/**
 * Run tasks whenever watched files change.
 *
 * @link https://github.com/gruntjs/grunt-contrib-watch
 */
module.exports = {
	docx: {
		files: ['src/docx/*.docx'],
		tasks: ['shell:prepare_markdown', 'shell:process_markdown_edits'],
		options: {
			spawn: false,
			livereload: true,
		},
	},
	css: {
		files: ['inc/scss/**/*.scss'],
		tasks: ['styles'],
		options: {
			spawn: false,
			livereload: true,
			debounceDelay: 250
		},
	},
	images: {
		files: ['inc/images/*'],
		tasks: ['imageminnewer'],
		options: {
			spawn: false,
			livereload: true,
			debounceDelay: 250
		},
	},
};
