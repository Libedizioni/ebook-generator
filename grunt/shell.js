/**
 * Run shell commands.
 *
 * @link https://github.com/sindresorhus/grunt-shell
 */
module.exports = {

	// ---------------------------------- //
	//         NEW BOOK BUILD             //
	// ---------------------------------- //
	prepare_markdown: {
		command: [
			// Setup Variables to pass to prepare-markdown.sh
			'DOCX=<%= book.path.docx %>',
			'SRC=<%= book.path.src %>',
			// Source and run prepare-markdown.sh
			'. ./inc/scripts/prepare-markdown.sh'
		].join(' && ')
	},
	process_markdown_edits: {
		command: [
			// Setup Variables to pass to process-markdown-edits.sh
			'SRC=<%= book.path.src %>',
			// Source and run process-markdown-edits.sh
			'. ./inc/scripts/process-markdown-edits.sh'
		].join(' && ')
	},
	build_epub: {
		command: [
			// Setup Variables to pass to build-epub.sh
			'BOOKNAME=<%= book.name %>',
			'BUILD=<%= book.path.build %>',
			'TOC_DEPTH=<%= book.tocdepth %>',
			'INTRO=$( find "<%= book.path.intro %>" -maxdepth 1 -type f -name "*.md" -printf "%p " )',
			'SOURCE=$( find "<%= book.path.src %>" -type f -name "*.md" -printf "%p " )',
			'COVER_IMAGE=<%= book.cover %>',
			'IMAGES=<%= book.images %>',
			'FONTS=<%= book.fonts %>/*/*.ttf',
			'CSS=<%= book.css %>',
			'METADATA=<%= book.metadata %>',
			'TITLE=<%= book.booktitle %>',
			'TEMPLATE_EPUB=<%= book.templates.epub %>',
			// Source and run build-epub.sh
			'. ./inc/scripts/build-epub.sh'
		].join(' && ')
	},
	build_html: {
		command: [
			// Setup Variables to pass to build-html.sh
			'BOOKNAME=<%= book.name %>',
			'BUILD=<%= book.path.build %>',
			'TOC_DEPTH=<%= book.tocdepth %>',
			'SOURCE=$( find "<%= book.path.src %>" -type f -name "*.md" -printf "%p " )',
			'CSS=<%= book.css %>',
			// Source and run build-html.sh
			'. ./inc/scripts/build-html.sh'
		].join(' && ')
	},
	build_pdf: {
		command: [
			// Setup Variables to pass to build-pdf.sh
			'BOOKNAME=<%= book.name %>',
			'BUILD=<%= book.path.build %>',
			'TOC_DEPTH=<%= book.tocdepth %>',
			'TITLE=<%= book.booktitle %>',
			'INTRO=$( find "<%= book.path.intro %>" -maxdepth 1 -type f -name "*.md" -printf "%p " )',
			'SOURCE=$( find "<%= book.path.src %>" -type f -name "*.md" -printf "%p " )',
			'TEMPLATE_PDF=<%= book.templates.pdf %>',
			// Source and run build-pdf.sh
			'. ./inc/scripts/build-pdf.sh'
		].join(' && ')
	},
	test_dependencies: {
		command: './inc/scripts/test-dependencies.sh'
	},


	// --------------------------------- //
	//         SCAFFOLD NEW BOOK         //
	// --------------------------------- //
	mkdir_scaffold_ebook: {
 		command: 'mkdir -p ../<%= book.name %>'
 	},
	search_replace_intro: {
		command: [
			'cd ../<%= book.name %>',
			'for file in <%= book.path.intro %>/*.txt ; do cp -f "$file" "${file%.txt}.md" ; done',
			'sed -i "s|PUBLISHER|<%= book.publisher.name %>|g" "<%= book.path.intro %>/01-publisher.md"',
			'sed -i "s|LINK|<%= book.publisher.link %>|g" "<%= book.path.intro %>/01-publisher.md"',
			'sed -i "s|URL|<%= book.publisher.url %>|g" "<%= book.path.intro %>/01-publisher.md"',
			'sed -i "s|ORIGINAL_TITLE|<%= book.original.title %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|ORIGINAL_PUBLISHER|<%= book.original.publisher %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|ORIGINAL_YEAR|<%= book.original.year %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|TRANSLATOR|<%= book.translator.name %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|COVER_BY|<%= book.editor.cover.name %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|DESIGN|<%= book.editor.design %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|LAYOUT|<%= book.editor.layout %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|BOOK_ISBN|ISBN <%= book.publisher.isbn %>|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|DATE|$(date +\"%Y\")|g" "<%= book.path.intro %>/02-metadata.md"',
			'sed -i "s|COPYRIGHT|<%= book.publisher.copyright %>|g" "<%= book.path.intro %>/02-metadata.md"'
		].join(' && ')
	},
	search_replace_metadata: {
		command: [
			'cd ../<%= book.name %>',
			'sed -i "s|BOOK_TITLE|<%= book.title %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|BOOK_AUTHOR|<%= book.author.name %> <%= book.author.surname %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|AUTHOR_BOOK|<%= book.author.surname %>, <%= book.author.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TRANSLATOR|<%= book.translator.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|COVER_BY|<%= book.editor.cover.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|DESIGN|<%= book.editor.design %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LAYOUT|<%= book.editor.layout %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|PUBLISHER|<%= book.publisher.name %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LANGUAGE|<%= book.publisher.language %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|DATE|$(date +\"%Y\")|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|BOOK_ISBN|<%= book.publisher.isbn %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|BOOK_DESCRIPTION|<%= book.description %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|COPYRIGHT|<%= book.publisher.copyright %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LICENSE|<%= book.publisher.license %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|LEGALCODE|<%= book.publisher.legalcode %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_1|<%= book.tags.one %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_2|<%= book.tags.two %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_3|<%= book.tags.three %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_4|<%= book.tags.four %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_5|<%= book.tags.five %>|g" "<%= pkg.dir.inc %>/metadata.xml"',
			'sed -i "s|TAG_6|<%= book.tags.six %>|g" "<%= pkg.dir.inc %>/metadata.xml"'
		].join(' && ')
	},
	search_replace_booktitle: {
		command: [
			'cd ../<%= book.name %>',
			'sed -i "s|BOOK_TITLE|<%= book.title %>|g" "<%= pkg.dir.inc %>/title.yaml"',
			'sed -i "s|BOOK_AUTHOR|<%= book.author.name %> <%= book.author.surname %>|g" "<%= pkg.dir.inc %>/title.yaml"'
		].join(' && ')
	},
	search_replace_style: {
		command: [
			'cd ../<%= book.name %>',
			'sed -i "s|BOOK_TITLE|<%= book.title %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|BOOK_REPO|<%= book.repository.url %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|EDITOR_REPO|<%= book.publisher.repository %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|BOOK_DESCRIPTION|<%= book.description %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|CODE_LICENSE_URI|<%= book.repository.licenseuri %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|CODE_LICENSE|<%= book.repository.license %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|LICENSE|<%= book.publisher.license %>|g" "<%= pkg.dir.sass %>/style.scss"',
			'sed -i "s|LEGALCODE|<%= book.publisher.legalcode %>|g" "<%= pkg.dir.sass %>/style.scss"'
		].join(' && ')
	},
	replace_readme: {
		command: [
			'cd ../<%= book.name %>',
			'rm README.md',
			'touch README.md',
			'echo "#<%= book.title %>" >> "README.md"',
			'echo "##<%= book.author.name %> <%= book.author.surname %>" >> "README.md"',
			'echo "_**<%= book.description %>**_" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "---" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "- **Translated by:** <%= book.translator.name %>" >> "README.md"',
			'echo "- **Ebook design:** <%= book.editor.design %>" >> "README.md"',
			'echo "- **Ebook layout:** <%= book.editor.layout %>" >> "README.md"',
			'echo "- **Publisher:** <%= book.publisher.name %>" >> "README.md"',
			'echo "- **ISBN:** <%= book.publisher.isbn %>" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "**©** _$(date +\"%Y\")_ | <%= book.publisher.copyright %> | [<%= book.license %>](<%= book.publisher.legalcode %>)" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "_Original title: **<%= book.original.title %>** published by <%= book.original.publisher %> in <%= book.original.year %>_" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "---" >> "README.md"',
			'echo "" >> "README.md"',
			'echo "###### _This ebook was generated with [Ebook Generator](<%= pkg.repository.url %>) - made with :heart: by [<%= pkg.author.name %>](<%= pkg.author.url %>) | [Libe Edizioni](<%= pkg.author.url %>)._" >> "README.md"',
			'echo "" >> "README.md"'
		].join(' && ')
	},
	init_book_git_repo: {
		command: [
			'cd ../<%= book.name %>',
			'rm CHANGELOG.md',
			'touch CHANGELOG.md',
			'git init',
			'git config user.name "<%= book.repository.user.name %>"',
			'git config user.email "<%= book.repository.user.email %>"',
			'git remote add origin <%= book.repository.remote %>.<%= book.repository.type %>',
			'git add .',
			'git commit -m "Init \"<%= book.name %>\" repository."'
		].join(' && ')
	},

};
